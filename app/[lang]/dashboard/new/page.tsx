import { getNews } from '@/actions/news';
import {Report,columns} from './_components/colums';
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(): Promise<Report[]> {
    // Fetch data from your API here.
    const news = await getNews();
    return news;
  }
const NewPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
      const data=await getData()
    return ( <>
        <section className="container mx-auto py-10">
        <Button asChild>
            <Link href={`/dashboard/new/create`}>{dictionary.Dashboard["News"]["Create New"]}</Link>
        </Button>
        <DataTable columns={columns} data={data} inputPlaceholder={dictionary.Dashboard["News"]["Filter Title..."]} filterValue='title' />
      </section>
    </> );
}
 
export default NewPage;