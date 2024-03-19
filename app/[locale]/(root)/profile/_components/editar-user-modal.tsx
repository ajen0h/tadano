'use client';
import {UpdateProfile} from '@/actions/users';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ImageUpload from '@/components/ui/image-upload';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

import {ProfileSchema} from '@/schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {useEffect, useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import toast, {Toaster} from 'react-hot-toast';
import {z} from 'zod';
import { useRouter } from 'next/navigation';


type User = {
  name: string;
  email: string;
  description: string;
};

interface EditarUseModalProp {
  initialData: User | null;
  userId: string;
}

export const EditarUseModal = ({userId, initialData}: EditarUseModalProp) => {
    console.log(initialData);
  const t = useTranslations('Dashboard.User');
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      description: '',
    },
  });



  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
     
      let res;
      if (initialData) {
        res = await UpdateProfile(userId, values);
      }

      if (res?.success) {
        toast.success(`${res.success}`);
        setOpen(false);
        router.refresh()
      } else {
        toast.error(`${res?.error}`);
      }
    });
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4">
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
                    name="description"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>{t('Description-Label')}</FormLabel>
                        <FormControl>
                          <Input
                            disabled={pending}
                            placeholder={t('Description-Placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button disabled={pending}>{t('Create')}</Button>
                </form>
              </Form>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
