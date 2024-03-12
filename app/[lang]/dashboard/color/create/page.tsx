import { GoBackButton } from "../../_components/goback-button";
import { ColorForm } from "../_components/color-form";

const ColorCreatePage =async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
    return ( <>
      <GoBackButton href={"/dashboard/color"} title={dictionary.General["Go back"]}/>

    <ColorForm initialData={null}/>
    </> );
}
 
export default ColorCreatePage;