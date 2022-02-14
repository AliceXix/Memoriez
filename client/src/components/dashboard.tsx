import { useNavigate, useParams } from "react-router-dom";
//import { getProfileInfos } from "../handlers/getProfileInfos";
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

  console.log(JSON.stringify(user?.user._id))

  // const arr = [
  //   {
  //     _id: "1234",
  //     name: "bob",
  //     relationship: ["friend"],
  //     memories: ["some text"],
  //   },
  //   {
  //     _id: "5678",
  //     name: "tim",
  //     relationship: ["mom"],
  //     memories: ["some text"],
  //   },
  //   {
  //     _id: "8912",
  //     name: "junka",
  //     relationship: ["girlfriend"],
  //     memories: ["some text"],
  //   },
  //   {
  //     _id: "4567",
  //     name: "heaven",
  //     relationship: ["enemy"],
  //     memories: ["some text"],
  //   },
  // ];

  const personID = user?.user.circle.map((elm) => {
    return elm._id
  })

  const personName = user?.user.circle.map((elm) => {
    return elm.name;
  });

  const personMemories = user?.user.circle.map((elm) => {
    return elm.memories;
  });

  console.log('---------')
  console.log(personMemories);

  return (
    //TODO: put name of user above person widgets
    <>
      <main className="main">
        <div className="grouping-left">
          <h1>Name of user: {user?.user.username}</h1>
          <br />
          <button
            className="button-to-text"
            onClick={() => {
              console.log("button has been clicked");
              navigate(`/add-person/${user?.user._id}`);
            }}
          >
            Add person
          </button>
        </div>
        <section className="widgets">
          {user?.user.circle.map((elm) => {
            console.log('this is elm')
            console.log(user?.user.circle);
            return <PersonWidget key={elm._id} _id={elm._id} name={elm.name} />;
          })}

          {/* <PersonWidget  _id={personID} name={personName}/>; */}
        </section>
      </main>
    </>
  );
}
