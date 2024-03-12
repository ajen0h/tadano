import {columns} from './_components/colums'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { getTeam } from '@/actions/teams';
import { Team } from '@prisma/client';

async function getData(): Promise<Team[]> {
  // Fetch data from your API here.
  const teams = await getTeam();
  return teams;
}
const TeamsPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  const data = await getData();
    return (
      <>
        <section className="container mx-auto py-10">
          <Button asChild>
            <Link href={`/dashboard/teams/create`}>{dictionary.Dashboard["Category"]["Create Team"]}</Link>
          </Button>
          <DataTable columns={columns} data={data} inputPlaceholder={dictionary.Dashboard["Category"]["Filter Names..."]}filterValue='name'/>
        </section>
      </>
    );
  };

export default TeamsPage;
