import {Category,columns} from './_components/colums';
import {DataTable} from '@/components/data-table';
import {getCategory} from '@/actions/category';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getData(): Promise<Category[]> {
  // Fetch data from your API here.
  const categories = await getCategory();
  return categories;
}
const CategoryPage = async ({params:{lang}}:{params:{lang:string}}) => {
  const data = await getData();
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)

  return (
    <>   
      <section className="container mx-auto py-10">
        <Button asChild>
            <Link href={`/dashboard/category/create`}>{dictionary.Dashboard["Category"]["Create Category"]}</Link>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={dictionary.Dashboard["Category"]["Filter Names..."]} filterValue='name' />
      </section>
    </>
  );
};

export default CategoryPage;
