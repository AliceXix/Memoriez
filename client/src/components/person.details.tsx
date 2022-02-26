import * as React from "react";
import { useNavigate } from "react-router-dom";
import MemoryWidget from "./memory.widget";
import { useParams } from "react-router-dom";
import { createBrowserHistory} from "history";


const history = createBrowserHistory();
history.push("/login")

export interface personData {
  memories: {
    author: string[],
    person: string[],
    text: string,
    title: string,
    _id: string
  }[];
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

return (
  <>
    <main className="main">
      <button
        className="button"
        onClick={() => {
          navigate(`/add-memory/${person?._id}`);
        }}
      >
        Add memory!
      </button>
      <section className="box">
        <h2>Person name: {person?.name}</h2>
        <h5>relationship to person</h5>
      </section>
      <section className="widgets">
        <aside className="widget">
          {person?.memories.map((elm) => {
            return <MemoryWidget key={elm._id} title={elm.title} _id={elm._id}/>
          })}
        </aside>
      </section>
    </main>
    <button
      className="button-back">Back</button>
  </>
);
}