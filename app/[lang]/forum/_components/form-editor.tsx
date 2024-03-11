'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Controller, useForm} from 'react-hook-form';
import {Editor} from './editor';
import { CreateThread } from '@/actions/thread';

export const FormEditor = () => {
  const form = useForm();
  const onSubmit = async (values: any) => {
    console.log(values);
    await CreateThread(values);
  };
  return (
    <div>
      EditorForm!
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input placeholder="Thread Title" {...form.register('title')} />
        <Input placeholder="Description" {...form.register('description')} />
        <Controller
        control={form.control}
          name="body"
          defaultValue=""
          render={({field}) => (
            <Editor onChange={field.onChange} body={field.value} />
          )}
        />
        <Button>Save!</Button>
      </form>
    </div>
  );
};
