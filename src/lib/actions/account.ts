"use server";

import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import db from '@/db/drizzle';
import { users, binanceCredentials } from '@/db/schema';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import type { ActionResponse } from '@/lib/types';
import {
  updateUserDetailsSchema,
  type UpdateUserDetailsInput,
  binanceCredentialsSchema,
  type BinanceCredentialsInput,
  toggleBinanceSchema,
} from '@/lib/validations/account';
import { encrypt } from '@/lib/utils/encryption';
import { ZodError } from 'zod';

export async function updateUserDetails(input: UpdateUserDetailsInput): Promise<ActionResponse> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) return { success: false, error: 'Authentication required' };

    const validated = updateUserDetailsSchema.parse(input);

    const updated = await db
      .update(users)
      .set({
        ...(validated.name ? { name: validated.name } : {}),
        ...(validated.phone ? { phone: validated.phone } : {}),
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id))
      .returning();

    revalidatePath('/account');
    return { success: true, data: updated[0], message: 'Account updated' };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return { success: false, error: 'Invalid input' };
    }
    console.error('updateUserDetails error', error);
    return { success: false, error: 'Failed to update account' };
  }
}

export async function saveBinanceCredentials(input: BinanceCredentialsInput): Promise<ActionResponse> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) return { success: false, error: 'Authentication required' };

    const validated = binanceCredentialsSchema.parse(input);
    const encKey = encrypt(validated.apiKey);
    const encSecret = encrypt(validated.apiSecret);

    const upserted = await db
      .insert(binanceCredentials)
      .values({
        userId: session.user.id,
        apiKeyEncrypted: encKey,
        apiSecretEncrypted: encSecret,
        isActive: true,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: binanceCredentials.userId,
        set: {
          apiKeyEncrypted: encKey,
          apiSecretEncrypted: encSecret,
          isActive: true,
          updatedAt: new Date(),
        },
      })
      .returning();

    revalidatePath('/account');
    return { success: true, data: upserted[0], message: 'Binance credentials saved' };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return { success: false, error: 'Invalid input' };
    }
    console.error('saveBinanceCredentials error', error);
    return { success: false, error: 'Failed to save credentials' };
  }
}

export async function setBinanceActive(isActive: boolean): Promise<ActionResponse> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) return { success: false, error: 'Authentication required' };

    await db
      .update(binanceCredentials)
      .set({ isActive, updatedAt: new Date() })
      .where(eq(binanceCredentials.userId, session.user.id));

    revalidatePath('/account');
    return { success: true, message: isActive ? 'Reconnected' : 'Disconnected' };
  } catch (error) {
    console.error('setBinanceActive error', error);
    return { success: false, error: 'Failed to update Binance status' };
  }
}

export async function deleteBinance(): Promise<ActionResponse> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) return { success: false, error: 'Authentication required' };

    await db.delete(binanceCredentials).where(eq(binanceCredentials.userId, session.user.id));
    revalidatePath('/account');
    return { success: true, message: 'Binance credentials removed' };
  } catch (error) {
    console.error('deleteBinance error', error);
    return { success: false, error: 'Failed to remove credentials' };
  }
}

export async function getBinanceStatus(): Promise<ActionResponse<{ connected: boolean; isActive: boolean }>> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) return { success: false, error: 'Authentication required' };

    const rows = await db
      .select({ isActive: binanceCredentials.isActive })
      .from(binanceCredentials)
      .where(eq(binanceCredentials.userId, session.user.id))
      .limit(1);

    const connected = rows.length > 0;
    const isActive = connected ? Boolean(rows[0].isActive) : false;
    return { success: true, data: { connected, isActive } };
  } catch (error) {
    console.error('getBinanceStatus error', error);
    return { success: false, error: 'Failed to get status' };
  }
}