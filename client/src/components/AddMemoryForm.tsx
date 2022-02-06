import * as React from "react";

export default function AddMemoryForm() {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const userInput: { title: string; text: string } = {
    title: title,
    text: text,
  };

  async function addMemory(input: any) {
    const fetcher = await fetch("http://localhost:3000/api/add-memory", {
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
          console.log("we have submitted form and are ready for API call");
          const newMemory = await addMemory(userInput);
          console.log("here comes the output off calling API");
          console.log(newMemory);
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
