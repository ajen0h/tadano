'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import {Button} from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {SignInSchema, SignUpSchema} from '@/schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import toast, {Toaster} from 'react-hot-toast';
import {z} from 'zod';
import 'react-datepicker/dist/react-datepicker.css';
import {login, register} from '@/actions/auth';
import {ButtonGoogle} from '@/components/button-google';
import {usePathname, useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';

interface LoginProps {
  form: any;
  pending: boolean;
  onSubmit: (values: z.infer<typeof SignInSchema>) => void;
}

interface RegisterProps {
  form: any;
  pending: boolean;
  onSubmit: (values: z.infer<typeof SignUpSchema>) => void;
}
interface ModalProps {
  children: React.ReactNode;
  title: string;
}

const Modal = ({children, title}: ModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full w-full">{title}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const LoginForm = ({form, pending, onSubmit}: LoginProps) => {
  const t = useTranslations('Auht');
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t('Email-Label')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={pending}
                    placeholder={t('Email-Placeholder')}
                    {...field}
                  />
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
                <FormLabel>{t('Password-Label')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={pending}
                    placeholder={t('Password-Placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={pending}>{t('Sign In')}</Button>
        </form>
      </Form>
      <ButtonGoogle />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

const RegisterForm = ({form, pending, onSubmit}: RegisterProps) => {
  const t = useTranslations('Auht');

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t('Name-Label')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={pending}
                    placeholder={t('Name-Placeholder')}
                    {...field}
                  />
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
                <FormLabel>{t('Email-Label')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={pending}
                    placeholder={t('Email-Label')}
                    {...field}
                  />
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
                <FormLabel>{t('Password-Label')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={pending}
                    placeholder={t('Password-Label')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={pending}>{t('Register')}</Button>
        </form>
      </Form>
      <ButtonGoogle />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

interface ModalAuthProps {
  title: string;
}

export const ModalAuth = ({title}: ModalAuthProps) => {
  const [auth, setAuth] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const formRegitser = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });
  const formLogin = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmitRegister = async (values: z.infer<typeof SignUpSchema>) => {
    startTransition(async () => {
      const res = await register(values);
      if (res.success) {
        toast.success(`${res.success}`);
        setAuth(false);
      } else {
        toast.error(`${res.error}`);
      }
    });
  };
  const onSubmitLogin = async (values: z.infer<typeof SignInSchema>) => {
    startTransition(async () => {
      const res = await login(values);
      if (res?.error) {
        toast.error(`${res.error}`);
      }
    });
  };

  return (
    <>
      <Modal title={title}>
        {auth ? (
          <>
            <RegisterForm
              form={formRegitser}
              onSubmit={onSubmitRegister}
              pending={pending}
            />
            <Button onClick={() => setAuth(false)}>Login</Button>
          </>
        ) : (
          <>
            <LoginForm
              form={formLogin}
              onSubmit={onSubmitLogin}
              pending={pending}
            />
            <Button onClick={() => setAuth(true)}>Register</Button>
          </>
        )}
      </Modal>
    </>
  );
};
