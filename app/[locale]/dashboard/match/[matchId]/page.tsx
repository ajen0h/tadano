import { getTeam } from "@/actions/teams";
import { MatchForm } from "../_components/match-form";
import { getMatchById } from "@/actions/match";
import { GoBackButton } from "../../_components/goback-button";
import { getTranslations } from "next-intl/server";

const MatchIdPage =async ({params}:{params:{matchId:string,lang:string}}) => {
    const t = await getTranslations('Dashboard.Match');


    const match=await getMatchById(params.matchId)
    const teams=await getTeam()
    return ( <>
    <GoBackButton href="/dashboard/match" title={t("Go Back")} ></GoBackButton>
    <MatchForm initialData={match} teams={teams}/>
    </> );
}
 
export default MatchIdPage;