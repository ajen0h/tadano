'use client';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {SizeSchema} from '@/schema';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTransition} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import {Size} from '@prisma/client';
import { createSize, updateSize } from '@/actions/size';
import { useTranslations } from 'next-intl';

interface SizeFormPorps {
  initialData: Size | null;
}

export const SizeForm: React.FC<SizeFormPorps> = ({initialData}) => {
  const t = useTranslations('Dashboard.Size');

  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SizeSchema>>({
    resolver: zodResolver(SizeSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SizeSchema>) => {
    startTransition(async () => {
      let res;

      if (initialData) {
        res = await updateSize(initialData.id, values);
      } else {
        res = await createSize(values);
      }

      if (res.success) {
        toast.success(`${res.success}`);
        form.reset()

      } else {
        toast.error(`${res.error}`);
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t("Name-Label")}</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder={t("Name-Placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t("Value-Label")}</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder={t("Value-Placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending}>{t("Create")}</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
