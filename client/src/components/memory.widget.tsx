import { useNavigate } from "react-router-dom";

export default function MemoryWidget() {
  const navigate = useNavigate();

  return (
    <>
      <section className="widget main">
        <h3>Name of the memory</h3>
      </section>
      <button
        className="button-to-text"
        onClick={() => {
          navigate(`/memory-details/:id`);
        }}
      >
        View card
      </button>
    </>
  );
}
