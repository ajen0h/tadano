import { getTranslations } from "next-intl/server";
import { GoBackButton } from "../../_components/goback-button";
import { ColorForm } from "../_components/color-form";

const ColorCreatePage =async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Color');

    return ( <>
      <GoBackButton href={"/dashboard/color"} title={t("Go Back")}/>

    <ColorForm initialData={null}/>
    </> );
}
 
export default ColorCreatePage;