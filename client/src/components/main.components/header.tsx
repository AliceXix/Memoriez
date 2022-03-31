import { Input } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import * as React from "react";
//import PersonWidget from "../person.widget";
import { personData } from "../person.details";


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

export default function Header() {
  const [user, setUser] = React.useState<null | userData>();
  //const navigate = useNavigate();

  let { id } = useParams();
  let userId = localStorage.getItem("userId");
  //let id = "62090860481ca44282afbe08";

  async function getProfileInfos(id: any) {
    const fetcher = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "GET",
    });
    const data: userData = await fetcher.json();
    setUser(data);
    return data;
  }

    React.useEffect(() => {
      if (userId) {
      getProfileInfos(userId);
      }
    }, [userId]);

  return (
    <>
      <div className="row-items">
        <h1>Memoriez</h1>
        <Input placeholder="Search" />
        <h1>{user?.user.username}</h1>
      </div>
    </>
  );
}
