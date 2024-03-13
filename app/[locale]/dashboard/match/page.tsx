import {columns} from './_components/colums';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { Match } from '@prisma/client';
import { getMatch } from '@/actions/match';
import { getTranslations } from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';

async function getData(): Promise<Match[]> {
  // Fetch data from your API here.
  const matches = await getMatch();
  return matches;
}
const MatchPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Match');
  
  const data=await getData()
  return (
    <>
      <section className="container mx-auto py-10">
        <Button asChild>
            <NavigationLink href={`/dashboard/match/create`}>{t("Create Match")}</NavigationLink>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={t("Filter Dates")} filterValue='date'/>
      </section>
    </>
  );
};

export default MatchPage;
