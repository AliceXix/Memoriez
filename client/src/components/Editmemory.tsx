import { useParams, useNavigate } from "react-router-dom";
import * as React from "react";
import { memoryData } from "./memory.details";
import { post } from "../utils/network";

export default function EditMemory() {
  const user: string = JSON.parse(localStorage.userId);
  //TODO is user needed here or can it be removed?
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  let { id } = useParams();

  async function getMemory(id: any) {
    const fetcher = await fetch(
      `http://localhost:3000/api/memory-details/${id}`,
      {
        method: "GET",
      }
    );
    const data: memoryData = await fetcher.json();

    setTitle(data?.title);
    setText(data?.text);

    return data;
  }

  React.useEffect(() => {
    getMemory(id);
  }, [id]);

  async function editMemory(id: string | undefined) {
    const fetcher = await post(`edit-memory/${id}`, { title, text });
    const response = await fetcher.json();
    return response;
  }

  return (
    <>
      <section className="memory-detail-widget">
        <h1>Edit your memory</h1>
        <form
          onSubmit={() => {
            editMemory(id);
          }}
        >
          <header>
            <label>
              <h2>Memory title</h2>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            </label>
            <label>
              <h3>Person</h3>
            </label>
          </header>
          <input
            type="text"
            name="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
          <button
            type="submit"
            className="button-back"
            onClick={() => {
              navigate(-2);
            }}
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
