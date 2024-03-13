import { getNews } from '@/actions/news';
import {Report,columns} from './_components/colums';
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { getTranslations } from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';

async function getData(): Promise<Report[]> {
    // Fetch data from your API here.
    const news = await getNews();
    return news;
  }
const NewPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.New');

      const data=await getData()
    return ( <>
        <section className="container mx-auto py-10">
        <Button asChild>
            <NavigationLink href={`/dashboard/new/create`}>{t('Create New')}</NavigationLink>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={t('Filter Title')} filterValue='title' />
      </section>
    </> );
}
 
export default NewPage;