import {columns} from './_components/colums';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { Color } from '@prisma/client';
import { getColor } from '@/actions/color';

async function getData(): Promise<Color[]> {
  // Fetch data from your API here.
  const colors = await getColor();
  return colors;
}
const ColorPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  const data=await getData()
  return (
    <>
      <section className="container mx-auto py-10">
        <Button asChild>
            <Link href={`/dashboard/color/create`}>{dictionary.Dashboard["Color"]["Create Color"]}</Link>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={dictionary.Dashboard["Color"]["Filter Name..."]} filterValue='name'/>
      </section>
    </>
  );
};

export default ColorPage;
