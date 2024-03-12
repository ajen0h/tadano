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
import {TeamSchema} from '@/schema';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTransition} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import {Team} from '@prisma/client';
import ImageUpload from '@/components/ui/image-upload';
import {createTeam, updateTeam} from '@/actions/teams';
import { useDictionary } from '@/lib/dictionary-provider';

interface TeamFormPorps {
  initialData: Team | null;
}

export const TeamForm: React.FC<TeamFormPorps> = ({initialData}) => {
  const dictionary=useDictionary()
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof TeamSchema>>({
    resolver: zodResolver(TeamSchema),
    defaultValues: initialData || {
      name: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof TeamSchema>) => {
    startTransition(async () => {
      let res;

      if (initialData) {
        res = await updateTeam(initialData.id, values);
      } else {
        res = await createTeam(values);
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
            name="imageUrl"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url: string) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button disabled={pending}>Create</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
