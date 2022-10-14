import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

interface MemoriesWidgetProps {
  _id: string;
  title: string;
  text: string;
}

export default function MemoryWidget({
  _id,
  title,
  text,
}: MemoriesWidgetProps) {
  let userData: any | null = localStorage.getItem("userId");
  userData = JSON.parse(userData);
  const userId: string = userData._id;
  const queryClient = useQueryClient();

  async function addFavorite({ userId, _id }: { userId: string; _id: string }) {
    const fetcher: Response = await fetch(
      `http://localhost:3000/api/add-favorite/${userId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ memoryId: _id }),
      }
    );

    return await fetcher.json();
  }

  const mutation = useMutation(addFavorite, {
    onSuccess: () => {
      const queryData = queryClient.getQueryData(["getUserData"]);
      queryClient.invalidateQueries(["getUserData"]);
    },
  });

  return (
    <>
      <article className="flex-base">
        <section className="memory-widget">
          <Link
            className="memory-details-link"
            to={`/app/memory-details/${_id}`}
          />
          <button
            className="centered-btn"
            onClick={() => mutation.mutate({ userId, _id })}
          >
            🤍
          </button>
          <h3>{title}</h3>
          <div>
            <p>{text}</p>
          </div>
        </section>
      </article>
    </>
  );
}
