import {columns} from './_components/colums';
import { getPlayer } from '@/actions/player';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import Link from 'next/link';
import { Player } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';

async function getData(): Promise<Player[]> {
  // Fetch data from your API here.
  const players = await getPlayer();
  return players;
}
const PlayerPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Player');

 const data=await getData()
    return ( <>
        <section className="container mx-auto py-10">
        <Button asChild>
            <NavigationLink href={`/dashboard/player/create`}>{t("Create Player")}</NavigationLink>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={t("Filter Name")}filterValue='name' />
      </section>
    </> );
};

export default PlayerPage;
