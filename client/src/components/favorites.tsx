import React from "react";
import { userData } from "./main/side.nav";
import { GridItem } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import MemoryWidget from "./memory.widget";

export default function Favorites() {
    const [user, setUser] = React.useState<null | userData>();
    let userId: string | null = localStorage.getItem("userId");

    async function getProfileInfos(id: any) {
        const fetcher = await fetch(
            `http://localhost:3000/api/user/${id}`,
            {
                method: "GET",
            }
        );
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
            <p>hello</p>

            <GridItem gridArea={"details"} bg="blue">
                    <div className="scrollable">
                        <Wrap spacing="30px" bg="yellow" height={"70vh"}>
                            {user?.user.favorites.map((elm: any) => {
                                return (
                                    <WrapItem height={"180px"} width={"30%"} bg="purple">
                                        <MemoryWidget key={elm?._id} title={elm?.title} _id={elm?._id} />
                                    </WrapItem>
                                );
                            })}
                        </Wrap>
                    </div>
            </GridItem>
        </>
    );
}