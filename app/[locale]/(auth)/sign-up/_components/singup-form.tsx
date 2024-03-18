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
import {SignUpSchema} from '@/schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import toast, {Toaster} from 'react-hot-toast';
import {z} from 'zod';
import 'react-datepicker/dist/react-datepicker.css';
import {register} from '@/actions/auth';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';

export const SingUpForm = () => {
  const t=useTranslations("SignIn")
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    startTransition(async () => {
      const res = await register(values);
      if (res.success) {
        toast.success(`${res.success}`);
        router.push('/sign-in');
      } else {
        toast.error(`${res.error}`);
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t("Name-Label")}</FormLabel>
                <FormControl>
                  <Input disabled={pending}  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t("Email-Label")}</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t("Password-Label")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={pending}
                    
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button  className="w-full" disabled={pending}>{t("SignUp")}</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
