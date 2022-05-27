import * as React from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function AddPersonForm() {
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const userInput: {name: string} = {name: name};
    let { id } = useParams();

    async function addPerson(id:any, input:any) {
        const fetcher: Response = await fetch(
            `http://localhost:3000/api/add-person/${id}`,
            {
                headers: {
                    "Content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(input),
            }
        );

        const newPerson = await fetcher.json();
        return newPerson;
    }

    
    return (
        <>
            <form
                onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    await addPerson(id, userInput);
                }}
            >
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                ></input>
                <input
                    type="submit"
                    value="Add new person!"
                    onClick={() => {
                        navigate(-1)
                    }}
                ></input>
            </form>
        </>
    )
}