import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userData } from "./dashboard";
import { personData } from "./person.details";

export interface memoryData {
  title: string;
  text: string;
  author: userData[];
  person: personData[];
}

export default function MemoryDetails() {
    const [memory, setMemory] = React.useState<null | memoryData>();
    const navigate = useNavigate();

    let { id } = useParams();

    async function getMemory(id: any) {
        const fetcher = await fetch(
          `http://localhost:3000/api/memory-details/${id}`,
          {
            method: "GET",
          }
        );
        const data: memoryData = await fetcher.json();
        setMemory(data);
        return data;
    };

    React.useEffect(() => {
        getMemory(id);
    }, [id]);

    console.log(memory);


    return (
      <>
        <main className="main">
          <section className="box">
            <h2>Memory title: {memory?.title}</h2>
            <p>{memory?.text}</p>
          </section>
        </main>
        <button
            className="button-back"
            onClick={() => { navigate('') }}>Back</button>
      </>
    );
}