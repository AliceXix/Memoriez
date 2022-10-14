import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserData } from "./main/side.nav";
import { personData } from "./person.details";

export interface memoryData {
	title: string;
	text: string;
	author: UserData[];
	person: personData[];
	_id: string;
}

interface MemoryDetailsProps {
	children?: React.ReactNode;
}

export default function MemoryDetails({ children }: MemoryDetailsProps) {
	const [memory, setMemory] = React.useState<null | memoryData>();
	const navigate = useNavigate();
	let { id } = useParams();

	async function getMemory(id: any) {
		const fetcher = await fetch(
			`http://localhost:3000/api/memory-details/${id}`,
			{
				method: "GET",
			}
		);
		const data: memoryData = await fetcher.json();
		setMemory(data);

		return data;
	}

	React.useEffect(() => {
		getMemory(id);
	}, [id]);

	const person: personData[] | undefined = memory?.person;

	function handlePerson(person: any | undefined) {
		if (person === undefined) {
			return "no person attributed";
		} else {
			return person.name;
		}
	}

	async function handleDeletion(id: string | undefined) {
		const fetcher = await fetch(
			`http://localhost:3000/api/delete-memory/${id}`,
			{
				method: "DELETE",
			}
		);

		const response = await fetcher.json();

		response === "deleted"
			? window.alert("the memory has successfully been deleted")
			: window.alert(
				"there was an error during deletion, please contact dev team"
			);
	}

	return (
		<>
			<section className="memory-detail-widget">
				<header>
					<h2>Memory title: {memory?.title}</h2>
					<h3>Person: {handlePerson(person)}</h3>
				</header>
				<p>this is some dummy text {memory?.text}</p>
				<button
					className="button-back"
					onClick={() => {
					navigate(-1);
					}}
					>
					Back
				</button>
				<button
					onClick={() => {
					handleDeletion(id);
					navigate(-1);
					}}
					>
					Delete
				</button>
				<button
					onClick={() => {
					navigate(`/app/edit-memory/${id}`);
					}}
					>
					Edit
				</button>
			</section>
		</>
	);
}
