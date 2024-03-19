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
import {SignInSchema} from '@/schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import toast, {Toaster} from 'react-hot-toast';
import {z} from 'zod';
import 'react-datepicker/dist/react-datepicker.css';
import {login} from '@/actions/auth';
import {ButtonGoogle} from '@/components/button-google';
import {useRouter} from '@/navigation';
import { useTranslations } from 'next-intl';

export const SignInForm = () => {
  const t = useTranslations('SignIn');
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    startTransition(async () => {
      console.log(values);
      

      const res = await login(values);
      if (res) {
        toast.error(`${res.error}`);
      }else{
        toast.success(`LoginIn!`);
        console.log("object");
        router.refresh()
        router.back()

      }
    });
  };

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t("Email-Label")}</FormLabel>
                <FormControl>
                  <Input disabled={pending} 
                   {...field} />
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

          <Button className='w-full' disabled={pending}>{t("SignIn")}</Button>
        </form>
      </Form>
      <div className='flex flex-row justify-center items-center gap-3 py-4'>
        <p>------</p>
        <p>O</p>
        <p>------</p>
      </div>
      <ButtonGoogle pathname="/" />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
