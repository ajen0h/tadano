'use client';
import {createMatch, updateMatch} from '@/actions/match';
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
import {MatchSchema} from '@/schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {Match, Team} from '@prisma/client';
import {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import toast, {Toaster} from 'react-hot-toast';
import {z} from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Checkbox} from '@/components/ui/checkbox';

interface MatchFormProps {
  initialData: Match | null;
  teams: Team[];
}

export const MatchForm = ({initialData, teams}: MatchFormProps) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof MatchSchema>>({
    resolver: zodResolver(MatchSchema),
    defaultValues: initialData || {
      league: '',
      stadium: '',
      date: new Date(),
      visitingGoals: 0,
      localGoals: 0,
      visitingTeamId: '',
      localTeamId: '',
      isFinish: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof MatchSchema>) => {
    startTransition(async () => {
      let res;
      if (initialData) {
        res = await updateMatch(initialData.id, values);
      } else {
        res = await createMatch(values);
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
            name="league"
            render={({field}) => (
              <FormItem>
                <FormLabel>League</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="League" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stadium"
            render={({field}) => (
              <FormItem>
                <FormLabel>Stadium</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder="Stadium" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({field}) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                    <Input type='datetime-local'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="localGoals"
            render={({field}) => (
              <FormItem>
                <FormLabel>Local Goles</FormLabel>
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
            name="visitingGoals"
            render={({field}) => (
              <FormItem>
                <FormLabel>Visiting Goles</FormLabel>
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
            name="localTeamId"
            render={({field}) => (
              <FormItem>
                <FormLabel>Local Team</FormLabel>
                <Select
                  disabled={pending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a team"
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
          <FormField
            control={form.control}
            name="visitingTeamId"
            render={({field}) => (
              <FormItem>
                <FormLabel>Visiting Team</FormLabel>
                <Select
                  disabled={pending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a team"
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
          <FormField
            control={form.control}
            name="isFinish"
            render={({field}) => (
              <FormItem>
                <FormLabel>Finished</FormLabel>
                <FormControl>
                  <Checkbox
                    id="isFree"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
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
