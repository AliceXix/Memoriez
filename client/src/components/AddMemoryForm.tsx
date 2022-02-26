import * as React from "react";
import { useParams } from "react-router-dom";

export default function AddMemoryForm() {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const userInput: { title: string; text: string } = {
    title: title,
    text: text,
  };

  let { id } = useParams();

  async function addMemory(id: any, input: any) {
    const fetcher = await fetch(`http://localhost:3000/api/add-memory/${id}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(input),
    });

    const newMemory = await fetcher.json();
    return newMemory;
  }

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const newMemory = await addMemory(id, userInput);
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type={"text"}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label htmlFor="text">Text</label>
        <input
          id="text"
          type={"text"}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <input type={"submit"} value={"Add memory!"}></input>
      </form>
    </>
  );
}
