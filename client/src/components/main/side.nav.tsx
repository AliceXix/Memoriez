import { Link, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { personData } from "../person.details";
import { memoryData } from "../memory.details";
import { useQuery } from "react-query";
import AddPersonForm from "../addPersonForm";
import { post } from "../../utils/network";

export interface UserData {
memory: string[];
user: {
	circle: personData[];
	_id: string;
	username: string;
	mail: string;
	favorites: memoryData[];
};
_id: string;
}

export default function SideNav() {
	const navigate = useNavigate();
	let userData: any | null = localStorage.getItem("userId");
	userData = JSON.parse(userData);
	const userId : string = userData._id;
	const { isOpen, onOpen, onClose } = useDisclosure();

	async function getProfileInfos(id: string) : Promise<UserData> {
		const fetcher: Response = await fetch(
			`http://localhost:3000/api/user/${id}`,
			{
				method: "GET",
			}
		);
		const data: UserData = await fetcher.json();

		return data;
	}

	const query = useQuery(["getUserData", userId], () =>
			getProfileInfos(userId)
		);
	const user = query.data?.user;
	//TODO type this, PS userData doesn't work

	async function handleLogout() : Promise<void> {
		localStorage.clear();
	}

	async function removeFromFav(id : string, userId : string) {
		const fetcher : Response = await post(`delete-fav/${id}`, {userId})

		const response = await fetcher.json();

		response === "deleted"
		? window.alert("the memory has successfully been deleted")
		: window.alert(
			"there was an error during deletion, please contact dev team"
			);

		response === "deleted"
		? console.log("this has worked")
		: console.log("this hasn't worked");
	}

	return (
		<>
			<div className="nav-parent">
				<nav className="column-items">
					<div>
						<div className="center-items">
							<h1>Memoriez</h1>
						</div>
						<hr />

						<div className="favorite-memoriez">
							<div className="center-items">
								<Link href={`/app/favorites/${user?._id}`}>
									<h3>Your favorite memoriez</h3>
								</Link>
							</div>

							<div className="wrapper-nav">
								<div className="scrollable">
									{user?.favorites.map((elm) => {
										return (



											<div>
												<Link>
													<button
														onClick={() => {
															removeFromFav(elm._id, user?._id);
														}}
														>
														X
													</button>
													<button
														onClick={() => {
															navigate(`/app/memory-details/${elm._id}`);
														}}
														>
														<h4>{elm.title}</h4>
													</button>
												</Link>
											</div>



										);
									})}
								</div>
							</div>
						</div>
					</div>

					<div>
						<hr />
							<div className="add-person">
								<button
									onClick={() => {
										onOpen();
									}}
									>
									<h4>+ add person</h4>
								</button>
								<AddPersonForm isOpen={isOpen} onClose={onClose} />
							</div>
						<hr />

						<div className="container-logout">
							<button className="button-dark">
								<Link
									onClick={() => {
									handleLogout();
									navigate("/login");
									}}
									>
									<h4>Logout</h4>
								</Link>
							</button>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}
