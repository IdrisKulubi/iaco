'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserProfile } from '@/lib/actions/profile';
import { updateUserProfileSchema, type UpdateUserProfileInput } from '@/lib/validations/profile';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const options = {
  experience: [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
  ],
  objectives: [
    { id: 'learning', label: 'Learning' },
    { id: 'long-term-growth', label: 'Long-term growth' },
    { id: 'diversification', label: 'Diversification' },
    { id: 'trading', label: 'Active trading' },
    { id: 'defi', label: 'DeFi and yield' },
  ],
  risk: [
    { id: 'low', label: 'Low' },
    { id: 'medium', label: 'Medium' },
    { id: 'high', label: 'High' },
  ],
};

export default function ProfileSettingsForm({ defaultValues }: { defaultValues: UpdateUserProfileInput }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<UpdateUserProfileInput>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues,
  });

  const onSubmit = (values: UpdateUserProfileInput) => {
    startTransition(async () => {
      const res = await updateUserProfile(values);
      if (res.success) toast.success('Preferences updated');
      else toast.error(res.error || 'Update failed');
    });
  };

  const selectedObjectives = form.watch('investmentObjectives') || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="experienceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience level</FormLabel>
              <FormDescription>Tailor the content to your level.</FormDescription>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-1 gap-3 mt-2">
                  {options.experience.map(opt => (
                    <div key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border ${field.value === opt.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' : ''}`}>
                      <RadioGroupItem value={opt.id} id={`exp-${opt.id}`} />
                      <Label htmlFor={`exp-${opt.id}`}>{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="investmentObjectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment objectives</FormLabel>
              <FormDescription>Select all that apply.</FormDescription>
              <FormControl>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {options.objectives.map(opt => {
                    const isChecked = selectedObjectives.includes(opt.id);
                    return (
                      <div key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border ${isChecked ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' : ''}`}>
                        <Checkbox
                          id={`obj-${opt.id}`}
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const current = field.value || [];
                            field.onChange(checked ? [...current, opt.id] : current.filter(v => v !== opt.id));
                          }}
                        />
                        <Label htmlFor={`obj-${opt.id}`}>{opt.label}</Label>
                      </div>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="riskTolerance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk tolerance</FormLabel>
              <FormDescription>Impacts recommendations and alerts.</FormDescription>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange} className="grid grid-cols-1 gap-3 mt-2">
                  {options.risk.map(opt => (
                    <div key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border ${field.value === opt.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' : ''}`}>
                      <RadioGroupItem value={opt.id} id={`risk-${opt.id}`} />
                      <Label htmlFor={`risk-${opt.id}`}>{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" disabled={isPending}>Save Preferences</Button>
        </div>
      </form>
    </Form>
  );
}