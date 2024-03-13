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
import { useRouter } from 'next/navigation';

export const ThreadForm = () => {
  const ruter=useRouter()
  const form = useForm({
    resolver: zodResolver(ThreadSchema),
    defaultValues: {
      title: '',
      description: '',
      body: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadSchema>) => {
    const res=await CreateThread(values);
    if(res.success){
      ruter.push("/forum")
    }
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input placeholder="Thread Title" {...form.register('title')} />
        <ErrorMessage errors={form.formState.errors} name="title" />
        <Input placeholder="Description" {...form.register('description')} />
        <ErrorMessage errors={form.formState.errors} name="description" />
        <Controller
          control={form.control}
          name="body"
          defaultValue=""
          render={({field}) => (
            <Editor onChange={field.onChange} body={field.value} />
          )}
        />
        <ErrorMessage errors={form.formState.errors} name="body" />

        <Button>Save!</Button>
      </form>
    </div>
  );
};
