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
import {Input} from '@/components/ui/input-dashboard';
import {Button} from '@/components/ui/button';
import toast, {Toaster} from 'react-hot-toast';
import {createColor, updateColor} from '@/actions/color';
import { useDictionary } from '@/lib/dictionary-provider';

interface ColorFormProps {
  initialData: Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({initialData}) => {
  const dictionary=useDictionary()
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <p className='text-sm font-semibold mb-2'>{dictionary.Dashboard["Color"]["Name"]}</p>
                  <FormControl>
                    <Input disabled={pending} placeholder="Entre a color's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({field}) => (
                <FormItem>
                  <p className='text-sm font-semibold mb-2'>{dictionary.Dashboard["Color"]["Value"]}</p>
                  <FormControl>
                    <Input disabled={pending} placeholder="Entre a value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button variant={"atm"} disabled={pending}>{dictionary.General["Create"]}</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
