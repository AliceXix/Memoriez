import { useParams } from "react-router-dom";
//import { getProfileInfos } from "../handlers/getProfileInfos";
import * as React from "react";

interface userData {
  id: string;
}

export default function Dashboard() {
  const [user, setUser] = React.useState("");

  let { id } = useParams();

  async function getProfileInfos(URLInput: any) {
    console.log("this is from getProfileInfos");
    console.log(URLInput);

    const fetcher = await fetch(
      `http://localhost:3000/api/dashboard/${URLInput}`,
      {
        method: "GET",
      }
    );
    const data: userData = await fetcher.json();
    setUser(JSON.stringify(data));
    return data;
  }

  const theResult = getProfileInfos(id);

  console.log(theResult);

  return (
    <>
      <p>hello, this is your dashboard.</p>
      <br />
      <h3>My id:</h3>
      <p>{id}</p>
      <p>this is the user: {user}</p>
    </>
  );
}
