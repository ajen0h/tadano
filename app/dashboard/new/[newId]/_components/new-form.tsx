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
import {NewSchema, TeamSchema} from '@/schema';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTransition} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import ImageUpload from '@/components/ui/image-upload';
import { Report } from '@prisma/client';
import {createNew, updateNew} from '@/actions/news';

interface NewFormPorps {
  initialData: Report | null;
}

export const NewForm: React.FC<NewFormPorps> = ({initialData}) => {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewSchema>>({
    resolver: zodResolver(NewSchema),
    defaultValues: initialData || {
      title: '',
      imageUrl: '',
      body: '',
      description:""
    },
  });

  const onSubmit = async (values: z.infer<typeof NewSchema>) => {
    startTransition(async () => {
      let res;

      if (initialData) {
        res = await updateNew(initialData.id, values);
      } else {
        res = await createNew(values);
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
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="Title" {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({field}) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="Body" {...field} />
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
          <Button disabled={pending}>Create</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
