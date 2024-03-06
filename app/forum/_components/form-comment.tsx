'use client';

import {Controller, useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import { EditorComments } from './editor-comments';

import { z } from 'zod';
import { CommentSchema } from '@/schema';

interface FormCommentProps{
    reportId:string
}

export const FormComment = ({reportId}:FormCommentProps) => {
  const form = useForm({
    defaultValues:{
        body:""
    }
  });
  const onSubmit = async (values: z.infer<typeof CommentSchema >) => {

    console.log(values);
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          control={form.control}
          name="body"
          defaultValue=""
          render={({field}) => (
            <EditorComments onChange={field.onChange} body={field.value} />
          )}
        />
        <Button className='w-full mt-3'>Save!</Button>
      </form>
    </div>
  );
};
