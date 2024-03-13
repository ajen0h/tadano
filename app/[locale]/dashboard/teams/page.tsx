import {columns} from './_components/colums'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { getTeam } from '@/actions/teams';
import { Team } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';

async function getData(): Promise<Team[]> {
  // Fetch data from your API here.
  const teams = await getTeam();
  return teams;
}
const TeamsPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Teams');

  const data = await getData();
    return (
      <>
        <section className="container mx-auto py-10">
          <Button asChild>
            <NavigationLink href={`/dashboard/teams/create`}>{t("Create Team")}</NavigationLink>
          </Button>
          <DataTable columns={columns} data={data} inputPlaceholder={t("Filter Names")}filterValue='name'/>
        </section>
      </>
    );
  };

export default TeamsPage;
