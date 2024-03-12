import {columns} from './_components/colums';
import {Product} from '@prisma/client';
import {getProducts} from '@/actions/products';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {DataTable} from '@/components/data-table';

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  const products = await getProducts();
  return products;
}
const ProductPage =async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  const data = await getData();
  return (
    <>
      <section className="container mx-auto py-10">
        <Button asChild>
          <Link href={`/dashboard/product/create`}>{dictionary.Dashboard["Product"]["Create Product"]}</Link>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={dictionary.Dashboard["Product"]["Filter Name..."]} filterValue='name' />
      </section>
    </>
  );
};

export default ProductPage;
