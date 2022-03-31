import { useNavigate } from "react-router-dom";

interface MemoriesWidgetProps {
  _id: string;
  title: string;
}

export default function MemoryWidget({_id, title}: MemoriesWidgetProps) {
  const navigate = useNavigate();

  return (
    <>
      <section>
        <h3>{title}</h3>

        <button
          // className="button-to-text"
          onClick={() => {
            navigate(`/app/memory-details/${_id}`);
          }}
        >
          View card
        </button>
      </section>
    </>
  );
}
