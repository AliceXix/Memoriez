import { useParams } from "react-router-dom";
//import { getProfileInfos } from "../handlers/getProfileInfos";

 interface userData {
   id: string;
 }

export default function Dashboard() {

    let { id } = useParams();

    console.log(id);


    async function getProfileInfos(URLInput: any) {
      console.log("this is from getProfileInfos");
      console.log(URLInput);

      const data = await fetch(
        `http://localhost:3000/api/dashboard/${URLInput}`,
        //`http://localhost:3000/api/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    //   const data: userData = await fetcher.json();
      console.log(`this is from the function getProfileInfo ${data}`)
      console.log(data)
      return data;
    };

    console.log( getProfileInfos(id));
 

return (

    <>
        <p>hello, this is your dashboard.</p>
        <br/>
        <h3>My id:</h3>
        <p>{id}</p>
        {/* <p>{async () => {await getProfileInfos(id)}}</p> */}
    </>
 )
}