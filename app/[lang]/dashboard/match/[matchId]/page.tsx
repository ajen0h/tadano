import { getTeam } from "@/actions/teams";
import { MatchForm } from "../_components/match-form";
import { getMatchById } from "@/actions/match";

const MatchIdPage =async ({params}:{params:{matchId:string}}) => {
    const match=await getMatchById(params.matchId)
    const teams=await getTeam()
    return ( <>
    <MatchForm initialData={match} teams={teams}/>
    </> );
}
 
export default MatchIdPage;