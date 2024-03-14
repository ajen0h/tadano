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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Input} from '@/components/ui/input';
import {AdviseSchema, CategorySchema} from '@/schema';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState, useTransition} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import {Category} from '@prisma/client';
import {createCategory, updateCategory} from '@/actions/category';
import {useTranslations} from 'next-intl';
import {Label} from '@/components/ui/label';
import {createAdvice} from '@/actions/advice';

interface AdviceFormProps {
  newId: string;
}

export const AdviceForm = ({newId}: AdviceFormProps) => {
  const t = useTranslations('Advice');
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AdviseSchema>>({
    resolver: zodResolver(AdviseSchema),
    defaultValues: {
      body: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof AdviseSchema>) => {
    startTransition(async () => {
      const res = await createAdvice(newId, values);
      if (res.success) {
        toast.success(`${res.success}`);
        setOpen(false);
      }
      if (res.error) {
        toast.error(`${res.error}`);
      }
    });
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          <Button>{t("Advice-Button")}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription> */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="md:grid md:grid-cols-1 ">
                  <Label>{t('Id-Label')}</Label>
                  <Input disabled value={newId} />
                  <FormField
                    control={form.control}
                    name="body"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>{t('Body-Label')}</FormLabel>
                        <FormControl>
                          <Input
                            disabled={pending}
                            {...field}
                            className="overflow-auto"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button disabled={pending}>{t('Send')}</Button>
              </form>
            </Form>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
