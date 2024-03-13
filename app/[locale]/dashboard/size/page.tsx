import {columns} from './_components/colums';
import {Size} from '@prisma/client';
import {getSize} from '@/actions/size';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {DataTable} from '@/components/data-table';
import { getTranslations } from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';

async function getData(): Promise<Size[]> {
  // Fetch data from your API here.
  const size = await getSize();
  return size;
}
const SizePage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Size');

  const data = await getData();
  return (
    <>
      <section className="container mx-auto py-10">
        <Button asChild>
          <NavigationLink href={`/dashboard/size/create`}>{t("Create Size")}</NavigationLink>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={t("Filter Name")} filterValue='name'/>
      </section>
    </>
  );
};

export default SizePage;
