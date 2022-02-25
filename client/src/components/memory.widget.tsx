import { useNavigate } from "react-router-dom";

interface MemoriesWidgetProps {
  _id: string,
  title: string
}

export default function MemoryWidget({_id, title}: MemoriesWidgetProps) {
  const navigate = useNavigate();

  return (
    <>
      <section className="widget main">
        <h3>Name of the memory {title}</h3>
      </section>
      <button
        className="button-to-text"
        onClick={() => {
          navigate(`/memory-details/${_id}`);
        }}
      >
        View card
      </button>
    </>
  );
}
