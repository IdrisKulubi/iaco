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
  phone: z.string().trim().regex(/^\+?[0-9\-() ]{7,20}$/i, 'Enter a valid phone number').optional().or(z.literal('')),
});

type FormValues = z.infer<typeof schema>;

export default function UserDetailsForm({
  defaultName,
  defaultEmail,
  defaultPhone
}: {
  defaultName: string;
  defaultEmail: string;
  defaultPhone?: string;
}) {
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-300">Name</Label>
          <Input
            id="name"
            {...form.register('name')}
            placeholder="Your name"
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-400">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">Email</Label>
          <Input
            id="email"
            value={defaultEmail}
            disabled
            className="bg-slate-800/30 border-slate-700 text-slate-400 cursor-not-allowed"
          />
          <p className="text-xs text-slate-500">Email cannot be changed</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-slate-300">Phone</Label>
          <Input
            id="phone"
            {...form.register('phone')}
            placeholder="e.g. +1 555 555 5555"
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
          />
          {form.formState.errors.phone && (
            <p className="text-sm text-red-400">{form.formState.errors.phone.message}</p>
          )}
        </div>
      </div>
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-sm"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}