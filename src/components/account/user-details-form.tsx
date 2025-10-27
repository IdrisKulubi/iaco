'use client';

import { useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserDetails } from '@/lib/actions/account';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100).optional(),
  phone: z.string().trim().regex(/^\+?[0-9\-()\s]{7,20}$/i, 'Enter a valid phone number').optional(),
});

type FormValues = z.infer<typeof schema>;

export default function UserDetailsForm({ defaultName, defaultEmail, defaultPhone }: { defaultName: string; defaultEmail: string; defaultPhone?: string; }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: defaultName || '', phone: defaultPhone || '' },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const res = await updateUserDetails(values);
      if (res.success) toast.success('Profile updated');
      else toast.error(res.error || 'Update failed');
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...form.register('name')} placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={defaultEmail} disabled />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...form.register('phone')} placeholder="e.g. +1 555 555 5555" />
        </div>
      </div>
      <div className="pt-2">
        <Button type="submit" disabled={isPending}>Save Changes</Button>
      </div>
    </form>
  );
}