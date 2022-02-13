import * as React from "react";
import { useNavigate } from "react-router-dom";
import MemoryWidget from "./memory.widget";
import { useParams } from "react-router-dom";

export interface personData {
  memories: string[];
  name: string;
  relationship: string[];
  _id: string;
}

export default function PersonDetails() {

    const [person, setPerson] = React.useState<null | personData>();
    const navigate = useNavigate();

    let { id } = useParams();

    async function getPersonDetails(id: any) {
      const fetcher = await fetch(
        `http://localhost:3000/api/person-details/${id}`,
        {
          method: "GET",
        }
      );
      const data: personData = await fetcher.json();
      setPerson(data);
      return data;
    }

    React.useEffect(() => {
      getPersonDetails(id);
    }, [id]);

    console.log(person) //returns object with properties
    console.log(person?.name); //returns undefined


    //NEED:
    //details person aka name
    //memories to the person

return (
  <>
    <main className="main">
      <button
      className="button"
      onClick={() => {
        navigate(`/add-memory/${person?._id}`)}
        }>Add memory!</button>
      <section className="box">
        <h2>Person name: {person?.name}</h2>
        <h5>relationship to person</h5>
      </section>
      <section className="widgets">
        <aside className="widget">
          <MemoryWidget/>
        </aside>
      </section>
    </main>
    <button className='button-back'>Back</button>
  </>
);
}