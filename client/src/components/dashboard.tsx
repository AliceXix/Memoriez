import { useNavigate, useParams } from "react-router-dom";
import * as React from "react";
import PersonWidget from "./person.widget";
import { personData } from "./person.details";


export interface userData {
  memory: string[];
  user: {
    circle: personData[];
    _id: string;
    username: string;
    mail: string;
  };
  _id: string;
};

export default function Dashboard() {
  const [user, setUser] = React.useState<null | userData>();
  const navigate = useNavigate();

  let { id } = useParams();

  async function getProfileInfos(id: any) {
    const fetcher = await fetch(
      `http://localhost:3000/api/dashboard/${id}`,
      {
        method: "GET",
      }
    );
    const data: userData = await fetcher.json();
    setUser(data);
    return data;
  }

  React.useEffect(() => {
    getProfileInfos(id);
  }, [id]);


  const personID = user?.user.circle.map((elm) => {
    return elm._id
  })

  const personName = user?.user.circle.map((elm) => {
    return elm.name;
  });

  const personMemories = user?.user.circle.map((elm) => {
    return elm.memories;
  });


  return (
    <>
      <main className="main">
        <div className="grouping-left">
          <h1>Name of user: {user?.user.username}</h1>
          <br />
          <button
            className="button-to-text"
            onClick={() => {
              navigate(`/add-person/${user?.user._id}`);
            }}
          >
            Add person
          </button>
        </div>
        <section className="widgets">
          {user?.user.circle.map((elm) => {
            return <PersonWidget key={elm._id} _id={elm._id} name={elm.name}/>;
          })}

          {/* <PersonWidget  _id={personID} name={personName}/>; */}
        </section>
      </main>
    </>
  );
}
