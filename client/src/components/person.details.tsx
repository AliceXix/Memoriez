import { useNavigate } from "react-router-dom";
import MemoryWidget from "./memory.widget";

export default function PersonDetails() {

  const navigate = useNavigate();

    //NEED:
    //details person aka name
    //memories to the person

return (
  <>
    <main className="main">
      <button
      className="button"
      onClick={() => {
        navigate("/add-memory")
        console.log("here I will make an API call")}
        }>Add memory!</button>
      <section className="box">
        <h2>Person name</h2>
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