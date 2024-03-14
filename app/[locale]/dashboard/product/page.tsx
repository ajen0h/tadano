import {columns} from './_components/colums';
import {Product} from '@prisma/client';
import {getProducts} from '@/actions/products';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {DataTable} from '@/components/data-table';
import { getTranslations } from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  const products = await getProducts();
  return products;
}
const ProductPage =async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Product');

  const data = await getData();
  return (
    <>
      <section className="container mx-auto py-10">
        <Button asChild>
          <NavigationLink href={`/dashboard/product/create`}>{t("Create Product")}</NavigationLink>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={t("Filter Name")} filterValue='name' />
      </section>
    </>
  );
};

export default ProductPage;
