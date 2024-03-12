import {columns} from './_components/colums';
import {Size} from '@prisma/client';
import {getSize} from '@/actions/size';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {DataTable} from '@/components/data-table';

async function getData(): Promise<Size[]> {
  // Fetch data from your API here.
  const size = await getSize();
  return size;
}
const SizePage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  const data = await getData();
  return (
    <>
      <section className="container mx-auto py-10">
        <Button asChild>
          <Link href={`/dashboard/size/create`}>{dictionary.Dashboard["Size"]["Create Size"]}</Link>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={dictionary.Dashboard["Size"]["Filter Name..."]} filterValue='name'/>
      </section>
    </>
  );
};

export default SizePage;
