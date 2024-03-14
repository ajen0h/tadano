import {Category,columns} from './_components/colums';
import {DataTable} from '@/components/data-table';
import {getCategory} from '@/actions/category';
import { Button } from '@/components/ui/button';

import {getTranslations} from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';

async function getData(): Promise<Category[]> {
  // Fetch data from your API here.
  const categories = await getCategory();
  return categories;
}
const CategoryPage = async () => {
  const t = await getTranslations('Dashboard');
  const data = await getData();
  return (
    <>   
      <section className="container mx-auto py-10">
        <Button asChild>
            <NavigationLink href={`/dashboard/category/create`}>{t("Category.Create Category")}</NavigationLink>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={t("Category.Filter Names")} filterValue='name' />
      </section>
    </>
  );
};

export default CategoryPage;
