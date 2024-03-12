'use client';

import {createPlayer, updatePlayer} from '@/actions/player';
import ImageUpload from '@/components/ui/image-upload';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {PlayerSchema} from '@/schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {Player, Team} from '@prisma/client';
import React, {useTransition} from 'react';
import {useForm} from 'react-hook-form';
import toast, {Toaster} from 'react-hot-toast';
import {z} from 'zod';
import { useDictionary } from '@/lib/dictionary-provider';


interface PlayerFormProps {
  initialData: Player | null;
  teams: Team[];
}

export const PlayerForm: React.FC<PlayerFormProps> = ({initialData, teams}) => {
  const dictionary=useDictionary()

  const [pending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(PlayerSchema),
    defaultValues: initialData || {
      name: '',
      age: 0,
      description: '',
      imageUrl: '',
      height: 0,
      weight: 0,
      dorsal: 0,
      goals: 0,
      assists: 0,
      saves: 0,
      position: '',
      country: '',
      teamId: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof PlayerSchema>) => {
    startTransition(async () => {
      let res;

      if (initialData) {
        res = await updatePlayer(initialData.id, values);
      } else {
        res = await createPlayer(values);
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Name"]}</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder={dictionary.Dashboard["Player"]["Name"]}{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Age"]}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="Name"
                    {...field}
                  />
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
                <FormLabel>{dictionary.Dashboard["Player"]["Description"]}</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder={dictionary.Dashboard["Player"]["Description"]} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Height"]}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Weight"]}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dorsal"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Dorsal"]}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goals"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Goals"]}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assists"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Assists"]}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="saves"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Saves"]}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={pending}
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Position"]}</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Country"]}</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="teamId"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Player"]["Local Team"]}</FormLabel>
                <Select
                  disabled={pending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={dictionary.Dashboard["Player"]["Select a team"]}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={pending}>{dictionary.General["Create"]}</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
