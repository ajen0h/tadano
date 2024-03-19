'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Controller, useForm} from 'react-hook-form';

import {CreateThread, updateThread} from '@/actions/thread';
import {ErrorMessage} from '@hookform/error-message';
import {zodResolver} from '@hookform/resolvers/zod';
import {ThreadSchema, ThreadUpdateSchema} from '@/schema';
import {z} from 'zod';
import {
  Category,
  CategoryThreads,
  Comment,
  Thread,
  ThreadVotes,
  User,
} from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {useRouter} from '@/navigation';
import {Editor} from '@/app/[locale]/forum/_components/editor';

type ThreadDate = {
  id: string;
  title: string;
  description: string;
  body: string;
  categoryThreadsId: string;
};
interface ThreadFormProps {
  initialValues: any;
  categories: CategoryThreads[];
}

export const ThreadEdit = ({categories, initialValues}: ThreadFormProps) => {
  console.log(initialValues);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(ThreadUpdateSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      body: '',
      categoryThreadsId: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadUpdateSchema>) => {
    console.log(values);
    const res = await updateThread(initialValues.id, values);
    console.log(res);
    if (res?.success) {
      console.log('object');
      router.push('/profile');
    }
    if (res?.error) {
      console.log('error');
    }
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
                <FormControl>
                  <Input placeholder="Titulo" {...field} />
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
                <FormControl>
                  <Input placeholder="Descripcion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="body"
            defaultValue=""
            render={({field}) => (
              <Editor onChange={field.onChange} body={field.value} />
            )}
          />
          <ErrorMessage errors={form.formState.errors} name="body" />

          <FormField
            control={form.control}
            name="categoryThreadsId"
            render={({field}) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Save!</Button>
        </form>
      </Form>
    </div>
  );
};
