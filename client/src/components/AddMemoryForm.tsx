import * as React from "react";
import { useParams } from "react-router-dom";

import { Input, Button } from "@chakra-ui/react";

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

    return await fetcher.json();
  }

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addMemory(id, userInput);
        }}
      >
        <label htmlFor="title"></label>
        <Input
          id="title"
          type={"text"}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
        <label htmlFor="text"></label>
        <Input
          id="text"
          type={"text"}
          placeholder="memory"
          onChange={(e) => setText(e.target.value)}
        ></Input>
        <Button>
          <input type={"submit"} value={"Create"}></input>
        </Button>
      </form>
    </>
  );
}
