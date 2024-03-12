import {columns} from './_components/colums';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { Match } from '@prisma/client';
import { getMatch } from '@/actions/match';
import Link from 'next/link';

async function getData(): Promise<Match[]> {
  // Fetch data from your API here.
  const matches = await getMatch();
  return matches;
}
const MatchPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  const data=await getData()
  return (
    <>
      <section className="container mx-auto py-10">
        <Button asChild>
            <Link href={`/dashboard/match/create`}>{dictionary.Dashboard["Match"]["Create Match"]}</Link>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={dictionary.Dashboard["Match"]["Filter Dates..."]} filterValue='date'/>
      </section>
    </>
  );
};

export default MatchPage;
