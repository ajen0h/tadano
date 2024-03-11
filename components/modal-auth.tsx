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

interface LoginProps {
  form: any;
  pending: boolean;
  pathname: string;
  onSubmit: (values: z.infer<typeof SignInSchema>) => void;
}

interface RegisterProps {
  form: any;
  pending: boolean;
  pathname: string;
  onSubmit: (values: z.infer<typeof SignUpSchema>) => void;
}
interface ModalProps {
  children: React.ReactNode
  title: string;

}


const Modal = ({children,title}: ModalProps) => {
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

const LoginForm = ({form, pending, pathname, onSubmit}: LoginProps) => {
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="Email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={pending}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={pending}>Create</Button>
        </form>
      </Form>
      <ButtonGoogle pathname={pathname} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

const RegisterForm = ({form, pending, pathname, onSubmit}: RegisterProps) => {
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="Name" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="Email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={pending}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={pending}>Create</Button>
        </form>
      </Form>
      <ButtonGoogle pathname={pathname} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

interface ModalAuthProps{
  title:string
}

export const ModalAuth = ({title}:ModalAuthProps) => {
  const [auth, setAuth] = useState(false);
  const [pending, startTransition] = useTransition();
  const pathname = usePathname();
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
       setAuth(true)
      } else {
        toast.error(`${res.error}`);
      }
    });
  };
  const onSubmitLogin = async (values: z.infer<typeof SignInSchema>) => {
    startTransition(async () => {
      const res = await login(values);
      if (res.success) {
        toast.success(`${res.success}`);
        router.push(`${pathname}`);
      } else {
        toast.error(`${res.error}`);
      }
    });
  };



  return (
    <>
      <Modal title={title}>
        {!auth ? (
          <>
            <LoginForm
              form={formLogin}
              pathname={pathname}
              onSubmit={onSubmitLogin}
              pending={pending}
            />
            <Button onClick={() => setAuth(false)}>Register</Button>
          </>
        ) : (
          <>
            <RegisterForm
              form={formRegitser}
              pathname={pathname}
              onSubmit={onSubmitRegister}
              pending={pending}
            />
            <Button onClick={() => setAuth(true)}>Login</Button>
          </>
        )}
      </Modal>
    </>
  );
};
