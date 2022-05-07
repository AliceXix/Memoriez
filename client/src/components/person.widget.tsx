import { NavigateFunction, useNavigate } from "react-router-dom";

interface PersonWidgetProps {
  _id: string;
  name: string;
}


export default function PersonWidget({_id, name}: PersonWidgetProps) {
    const navigate: NavigateFunction = useNavigate();


    return (
        <>
            <section className="widget main">
                <h3>Name of the person: {name}</h3>
                <button
                    className="button-to-text"
                    onClick={() => {navigate(`/app/person-details/${_id}`)}}
                >
                    View card
                </button>
            </section>
        </>
    );
}