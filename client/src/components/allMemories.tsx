import { useParams } from "react-router-dom";
import * as React from "react";
import { memoryData } from "./memory.details";
import MemoryWidget from "./memory.widget";
import { WrapItem } from "@chakra-ui/react";

export default function AllMemories({ searchKey }: { searchKey: string }) {
  let userData: any | null = localStorage.getItem("userId");
  userData = JSON.parse(userData);
  //TODO why do we have useData here? Evtl remove?
  const [memory, setMemory] = React.useState<memoryData[]>([]);
  let { id } = useParams();

  async function getMemories(id: any, searchKey: string) {
    const fetcher = await fetch(
      `http://localhost:3000/api/get-memories/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ searchKey: searchKey }),
      }
    );
    const memories = await fetcher.json();
    setMemory(memories);
    return memories;
  }

  //pass search key here
  //TODO

  React.useEffect(() => {
    getMemories(id, searchKey);
  }, [id, searchKey]);

  return (
    <>
      <p>{searchKey}</p>
      <div className="scrollable">
        <section className="memories-grid">
          {memory.map((elm: any) => {
            return (
              <>
                <WrapItem>
                  <MemoryWidget
                    key={elm?._id}
                    title={elm?.title}
                    text={elm?.text}
                    _id={elm?._id}
                  />
                </WrapItem>
              </>
            );
          })}
        </section>
      </div>
    </>
  );
}
