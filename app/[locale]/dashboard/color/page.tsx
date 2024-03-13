import {columns} from './_components/colums';
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Color } from '@prisma/client';
import { getColor } from '@/actions/color';
import { getTranslations } from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';

async function getData(): Promise<Color[]> {
  // Fetch data from your API here.
  const colors = await getColor();
  return colors;
}
const ColorPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard');
  
  const data=await getData()
  return (
    <>
      <section className="container mx-auto py-10">
        <Button asChild>
            <NavigationLink href={`/dashboard/color/create`}>{t('Color.Create Color')}</NavigationLink>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={t('Color.Filter Name')} filterValue='name'/>
      </section>
    </>
  );
};

export default ColorPage;
