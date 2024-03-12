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
import {Category} from '@prisma/client';
import {createCategory, updateCategory} from '@/actions/category';
import { useDictionary } from '@/lib/dictionary-provider';

interface CategoryFormPorps {
  initialData: Category | null;
}

export const CategoryForm: React.FC<CategoryFormPorps> = ({initialData}) => {
  const dictionary=useDictionary()
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
        res = await updateCategory(initialData.id, values);
      } else {
        res = await createCategory(values);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{dictionary.Dashboard["Category"]["Name"]}</FormLabel>
                  <FormControl>
                    <Input disabled={pending} placeholder={dictionary.Dashboard["Category"]["Name"]} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={pending}>{dictionary.General["Create"]}</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
