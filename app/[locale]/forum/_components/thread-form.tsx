'use client';
'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Controller, useForm} from 'react-hook-form';
import {Editor} from './editor';
import {CreateThread} from '@/actions/thread';
import {ErrorMessage} from '@hookform/error-message';
import {zodResolver} from '@hookform/resolvers/zod';
import {ThreadSchema} from '@/schema';
import {z} from 'zod';
import {useRouter} from '@/navigation';
import {CategoryThreads} from '@prisma/client';
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

interface ThreadFormProps {
  categories: CategoryThreads[];
}

export const ThreadForm = ({categories}: ThreadFormProps) => {
  const ruter = useRouter();
  const form = useForm({
    resolver: zodResolver(ThreadSchema),
    defaultValues: {
      title: '',
      description: '',
      body: '',
      categoryId: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadSchema>) => {
    console.log(values);
    const res = await CreateThread(values);
    if (res.success) {
      console.log("object");
      ruter.push('/forum');
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
            name="categoryId"
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
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
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
