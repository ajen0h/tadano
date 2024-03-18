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
import {CategorySchema} from '@/schema';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTransition} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import {Category, CategoryThreads} from '@prisma/client';
import {createCategory, createCategoryThread, updateCategory, updateCategoryThread} from '@/actions/category';
import { useTranslations } from 'next-intl';

interface CategoryFormPorps {
  initialData: CategoryThreads | null;
}

export const CategoryThreadForm: React.FC<CategoryFormPorps> = ({initialData}) => {
  const t = useTranslations('Dashboard');
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData || {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    startTransition(async () => {
      let res;

      if (initialData) {
        res = await updateCategoryThread(initialData.id, values);
      } else {
        res = await createCategoryThread(values);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t('Category.Name-Label')}</FormLabel>
                  <FormControl>
                    <Input disabled={pending} placeholder={t('Category.Name-Placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={pending}>{t('Category.Create')}</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
