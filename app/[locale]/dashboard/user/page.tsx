import { getUser } from "@/actions/users";
import { DataTable } from "@/components/data-table";
import NavigationLink from "@/components/navbar/navigation-link";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { columns } from "./_components/colums";

async function getData(): Promise<User[]> {
    // Fetch data from your API here.
    const user = await getUser();
    return user;
  }
const UserPage = async() => {
    const t = await getTranslations('Dashboard.User');
    const data = await getData();
    return (  <>
        <section className="container mx-auto py-10">
          <Button asChild>
            <NavigationLink href={`/dashboard/user/create`}>{t("Create User")}</NavigationLink>
          </Button>
          <DataTable columns={columns} data={data} inputPlaceholder={t("Filter Name")} filterValue='name'/>
        </section>
      </> );
}
 
export default UserPage;