'use client';

import React, { useEffect, useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { binanceCredentialsSchema, type BinanceCredentialsInput } from '@/lib/validations/account';
import { saveBinanceCredentials, setBinanceActive, getBinanceStatus, deleteBinance } from '@/lib/actions/account';

export default function BinanceKeysForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<BinanceCredentialsInput>({ resolver: zodResolver(binanceCredentialsSchema) });
  const [connected, setConnected] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getBinanceStatus();
      if (res.success && res.data) {
        setConnected(res.data.connected);
        setActive(res.data.isActive);
      }
    })();
  }, []);

  const onSubmit = (values: BinanceCredentialsInput) => {
    startTransition(async () => {
      const res = await saveBinanceCredentials(values);
      if (res.success) {
        toast.success('Credentials saved');
        setConnected(true);
        setActive(true);
        form.reset({ apiKey: '', apiSecret: '' });
      } else toast.error(res.error || 'Save failed');
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        {connected ? (
          <span>Connected to Binance. Status: {active ? 'Active' : 'Inactive'}</span>
        ) : (
          <span>No Binance connection yet.</span>
        )}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <Input id="apiKey" {...form.register('apiKey')} placeholder="Enter API Key" autoComplete="off" />
          </div>
          <div>
            <Label htmlFor="apiSecret">API Secret</Label>
            <Input id="apiSecret" type="password" {...form.register('apiSecret')} placeholder="Enter API Secret" autoComplete="off" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>Save</Button>
          {connected && (
            <>
              <Button type="button" variant="outline" onClick={() => startTransition(async () => {
                const res = await setBinanceActive(!active);
                if (res.success) { setActive(!active); toast.success(res.message); } else toast.error(res.error || 'Failed');
              })}>{active ? 'Disconnect' : 'Reconnect'}</Button>
              <Button type="button" variant="destructive" onClick={() => startTransition(async () => {
                const res = await deleteBinance();
                if (res.success) { setConnected(false); setActive(false); toast.success(res.message); } else toast.error(res.error || 'Failed');
              })}>Remove</Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}