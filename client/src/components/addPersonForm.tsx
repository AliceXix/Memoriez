import * as React from "react"
import { useParams } from "react-router-dom";

export default function AddPersonForm() {

    const [name, setName] = React.useState("");
    const userInput: {name: string} = {name: name};

    let { id } = useParams();

    async function addPerson(id:any, input:any) {

        const fetcher = await fetch(
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
            onSubmit={async (e) => {
                e.preventDefault();
                const newPerson = await addPerson(id, userInput);
            }}>
                <label htmlFor="name">Name:</label>
                <input
                id="name"
                type={"text"}
                onChange={(e) => setName(e.target.value)}></input>
                {/* <label htmlFor="relationship">Relationship:</label>
                <input
                id="reltionship"
                type={"text"}
                onChange={(e) => setRelationship(e.target.value)}></input> */}
                <input type={"submit"} value={"Add new person!"}></input>
            </form>
        </>
    )
}