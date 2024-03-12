import { getTeam } from "@/actions/teams";
import { MatchForm } from "../_components/match-form";
import { getMatchById } from "@/actions/match";
import { GoBackButton } from "../../_components/goback-button";

const MatchIdPage =async ({params}:{params:{matchId:string,lang:string}}) => {
    const dictionary=await import( `@/app/dictionaries/${params.lang}.json`).then(m=>m.default)

    const match=await getMatchById(params.matchId)
    const teams=await getTeam()
    return ( <>
    <GoBackButton href="/dashboard/match" title={dictionary.General["Go back"]} ></GoBackButton>
    <MatchForm initialData={match} teams={teams}/>
    </> );
}
 
export default MatchIdPage;