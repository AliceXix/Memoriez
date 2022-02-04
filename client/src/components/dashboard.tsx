import { useParams } from "react-router-dom";
import { getProfileInfos } from "../handlers/getProfileInfos";

export default function Dashboard() {

    let { id } = useParams();

    console.log(id);

    getProfileInfos(id);

return (

    <>
        <p>hello, this is your dashboard.</p>
        <br/>
        <h3>My id:</h3>
        <p>{id}</p>
    </>
 )
}