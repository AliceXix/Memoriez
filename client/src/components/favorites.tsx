import React from "react";
import { UserData } from "./main/side.nav";
import { GridItem } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import MemoryWidget from "./memory.widget";

export default function Favorites() {
  const [user, setUser] = React.useState<null | UserData>();
  let userData: any | null = localStorage.getItem("userId");
  userData = JSON.parse(userData);
  const userId = userData._id;

  async function getProfileInfos(id: any) {
    const fetcher = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "GET",
    });
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
      <p>hello</p>

      <GridItem gridArea="details" bg="blue">
        <div className="scrollable">
          <Wrap spacing="30px" bg="yellow" height="70vh">
            {user?.user.favorites.map((elm: any) => {
              return (
                <WrapItem height="180px" width="30%" bg="purple">
                  <MemoryWidget
                    key={elm?._id}
                    title={elm?.title}
                    _id={elm?._id}
                    text={elm?.text}
                  />
                </WrapItem>
              );
            })}
          </Wrap>
        </div>
      </GridItem>
    </>
  );
}
