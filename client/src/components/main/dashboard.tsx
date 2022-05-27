import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import * as React from "react";
import PersonWidget from "../person.widget";
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


export default function Dashboard() {
    const [user, setUser] = React.useState<null | userData>();
    const navigate: NavigateFunction = useNavigate();
    let { id } = useParams();


    async function getProfileInfos(id: any) {
        const fetcher: Response = await fetch(
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
        getProfileInfos(id);
    }, [id]);


    return (
        <>
            <main className="main">
                <div className="grouping-left">
                    <h1>Name of user: {user?.user.username}</h1>
                    <br />
                    <button
                        className="button-to-text"
                        onClick={() => {
                            navigate(`/app/add-person/${user?.user._id}`);
                        }}
                    >
                        Add person
                    </button>
                </div>

                <section className="widgets">
                    {user?.user.circle.map((elm) => {
                        return <PersonWidget key={elm._id} _id={elm._id} name={elm.name}/>;
                    })}
                </section>
            </main>
        </>
    );
}
