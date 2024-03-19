import {Category,columns} from './_components/colums';
import {DataTable} from '@/components/data-table';
import {getCategory, getCategoryThread} from '@/actions/category';
import { Button } from '@/components/ui/button';

import {getTranslations} from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';
import { CategoryThreads } from '@prisma/client';

async function getData(): Promise<CategoryThreads[]> {
  // Fetch data from your API here.
  const categories = await getCategoryThread();
  return categories;
}
const CategoryThreadPage = async () => {
  const t = await getTranslations('Dashboard');
  const data = await getData();
  return (
    <>   
      <section className="container mx-auto py-10">
        <Button asChild>
            <NavigationLink href={`/dashboard/categoryThread/create`}>{t("Category.Create Category")}</NavigationLink>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={t("Category.Filter Names")} filterValue='name' />
      </section>
    </>
  );
};

export default CategoryThreadPage;
