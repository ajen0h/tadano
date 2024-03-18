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
import { useTranslations } from 'next-intl';


interface MatchFormProps {
  initialData: Match | null;
  teams: Team[];
}

export const MatchForm = ({initialData, teams}: MatchFormProps) => {
  const t = useTranslations('Dashboard.Match');
  
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof MatchSchema>>({
    resolver: zodResolver(MatchSchema),
    defaultValues: initialData || {
      league: '',
      stadium: '',
      date: "",
      visitingGoals: 0,
      localGoals: 0,
      visitingTeamId: '',
      localTeamId: '',
      isFinish: false,
      capacity:0
      
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
        form.reset()

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
                <FormLabel>{t("League-Label")}</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder={t("League-Placeholder")} {...field} />
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
                <FormLabel>{t("Stadium-Label")}</FormLabel>
                <FormControl>
                  <Input disabled={pending} placeholder={t("Stadium-Placeholder")} {...field} />
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
                <FormLabel>{t("Date-Label")}</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    
                  />
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
                <FormLabel>{t("Local Goles-Label")}</FormLabel>
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
                <FormLabel>{t("Visiting Goles-Label")}</FormLabel>
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
                <FormLabel>{t("Local Team")}</FormLabel>
                <Select
                  disabled={pending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={t("Select a team")}
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
                <FormLabel>{t("Visiting Team-Label")}</FormLabel>
                <Select
                  disabled={pending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={t("Select a team")}
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
            name="capacity"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t("Capacity-Label")}</FormLabel>
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
            name="isFinish"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t("Finished-Label")}</FormLabel>
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
         

          <Button disabled={pending}>{t("Create")}</Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
