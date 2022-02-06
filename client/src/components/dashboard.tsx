import { useNavigate, useParams } from "react-router-dom";
//import { getProfileInfos } from "../handlers/getProfileInfos";
import * as React from "react";
import PersonWidget from './person.widget';

interface userData {
  id: string;
}

export default function Dashboard() {
  const [user, setUser] = React.useState("");
  const navigate = useNavigate();

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
    //TODO: put name of user above person widgets
    <>
      <main className="main">
        <div className="grouping-left">
          <h1>Name of user</h1>
          <br />
          <button
          className="button-to-text"
          onClick={() => {
            console.log("button has been clicked");
            navigate('/add-person')}}>Add person</button>
        </div>
        <section className="widgets">
          <PersonWidget />
        </section>
      </main>
      {/* <p>this is the user: {user}</p> */}
    </>
  );
}
