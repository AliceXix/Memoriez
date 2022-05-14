import { NavigateFunction, useNavigate } from "react-router-dom";
import React from "react";
import { userData } from "./main/side.nav";

interface MemoriesWidgetProps {
  _id: string;
  title: string;
}

export default function MemoryWidget({_id, title}: MemoriesWidgetProps) {
    const navigate: NavigateFunction = useNavigate();
    const [user, setUser] = React.useState<null | userData>();
    let userId: string | null = localStorage.getItem("userId");

    async function getProfileInfos(id: any) {
        const fetcher: Response = await fetch(`http://localhost:3000/api/user/${id}`, {
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


    async function addFavorite(userId: any, memoryId: any) {
        const fetcher: Response = await fetch(
            `http://localhost:3000/api/add-favorite/${userId}`,
            {
                headers: {
                    "Content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({memoryId: memoryId}),
            }
        );

        return await fetcher.json();
    }


  return (
    <>
        <section>
            <h3>{title}</h3>

            <button
                onClick={() => {
                navigate(`/app/memory-details/${_id}`);
                }}
            >
                View card
            </button>
        </section>

        <button onClick={async () => {
                await addFavorite(userId, _id)
            }}>
            🤍
        </button>
    </>
  );
}
