import * as React from "react";
import { personData } from "../person.details";

export interface UserData {
  memory: string[];
  user: {
    circle: personData[];
    _id: string;
    username: string;
    mail: string;
  };
  _id: string;
}

export default function Header() {
  const [user, setUser] = React.useState<null | UserData>();
  let userData: any | null = localStorage.getItem("userId");
  userData = JSON.parse(userData);
  const userId = userData._id;

  async function getProfileInfos(id: any) {
    const fetcher: Response = await fetch(
      `http://localhost:3000/api/user/${id}`,
      {
        method: "GET",
      }
    );
    const data: UserData = await fetcher.json();
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
        <h1>Hi {user?.user.username}!</h1>
      </div>
    </>
  );
}
