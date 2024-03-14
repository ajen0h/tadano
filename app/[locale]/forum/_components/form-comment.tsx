'use client';

import {Controller, useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {EditorComments} from './editor-comments';

import {z} from 'zod';
import {CommentSchema} from '@/schema';
import {createComment} from '@/actions/comment';
import toast from 'react-hot-toast';
import {useEffect, useTransition} from 'react';
import {useSession} from 'next-auth/react';
import {ModalAuth} from '@/components/modal-auth';

interface FormCommentProps {
  threadId: string;
}

export const FormComment = ({threadId}: FormCommentProps) => {
  const session = useSession();
  const [pending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      body: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentSchema>) => {
    startTransition(async () => {
      const res = await createComment(values, threadId);
      if (res) {
        form.reset();
        toast.success(`${res.success}`);
      }
    });
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

        <>
          <Button disabled={pending} className="w-full mt-3">
            Post!
          </Button>
        </>
      </form>
    </div>
  );
};
