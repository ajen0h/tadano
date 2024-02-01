'use client';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ColorSchema} from '@/schema';
import {useTransition} from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {z} from 'zod';
import {Color} from '@prisma/client';
import {FormInput} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import { createColor, updateColor } from '@/actions/color';

interface ColorFormProps {
  initialData: Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({initialData}) => {
  const [pending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(ColorSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ColorSchema>) => {
    startTransition(async () => {
      console.log(values);
      let res;
      if (initialData) {
        res = await updateColor(initialData.id, values);
      } else {
        res = await createColor(values);
      }

      if (res.success) {
        toast.success(`${res.success}`);
      } else {
        toast.error(`${res.error}`);
      }
    });
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={pending} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Value" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>

          <Button disabled={pending}>Create</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
