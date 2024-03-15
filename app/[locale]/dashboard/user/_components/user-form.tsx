'use client';
import {UpdateUser, createUser} from '@/actions/users';
import {Button} from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {UserSchema} from '@/schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import React, {useTransition} from 'react';
import {useForm} from 'react-hook-form';
import toast, {Toaster} from 'react-hot-toast';
import {z} from 'zod';

type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  password: string;
  role: string;
};

interface UserFormPorps {
  initialData: User | null;
}

export const UserForm: React.FC<UserFormPorps> = ({initialData}) => {
  const t = useTranslations('Dashboard.User');

  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      imageUrl: '',
      password: '',
      role: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    startTransition(async () => {
      let res;
      if (initialData) {
        res = await UpdateUser(initialData.id, values);
      } else {
        res = await createUser(values);
      }

      if (res.success) {
        toast.success(`${res.success}`);
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
            name="imageUrl"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
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
                    disabled={pending}
                    placeholder={t('Password-Placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t('Role-Label')}</FormLabel>
                <Select
                  disabled={pending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={t('Select a role')}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ADMIN">{t('Admin')}</SelectItem>
                    <SelectItem value="USER">{t('User')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={pending}>{t('Create')}</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
