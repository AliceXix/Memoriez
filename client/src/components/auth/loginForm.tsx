import * as React from "react";
import { useNavigate } from "react-router-dom";
import { memoryData } from "../memory.details";
import { personData } from "../person.details";

interface LoginOutput {
	_id: string;
	mail: string;
	username: string;
	favorites: memoryData[];
	circle: personData[];
	memories: memoryData[];
}

export default function LoginForm() {
	const [mail, setMail] = React.useState("");
	const [username, setUsername] = React.useState("");
	const userInfo: { mail: string; username: string } = {
		mail: mail,
		username: username,
	};
	const navigate = useNavigate();

	async function handleLogin(userInfo: any): Promise<LoginOutput> {
		const fetcher = await fetch("http://localhost:3000/api/login", {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(userInfo),
		});
		const userData: LoginOutput = await fetcher.json();
		return userData;
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		let userData = await handleLogin(userInfo);
		localStorage.setItem("userId", JSON.stringify(userData));
		navigate(`/app/dashboard/${userData._id}`);
	}

	return (
		<>
			<main className="auth-wrapper">
				<header>
					<h1>Memoriez</h1>
					<a href="/">Register</a>
				</header>

				<div>
					<div>
						<h2>Other component</h2>
						<p>App explanation</p>
					</div>
				</div>

				<div>
					<div>
						<main>
							<section>
								<h1>Login here!</h1>
								<form
									onSubmit={async (e) => {
									handleSubmit(e);
									}}
									>
									<div>
										<label htmlFor="username">Username:</label>
										<input
											id="username"
											type="text"
											onChange={(e) => setUsername(e.target.value)}
											></input>
									</div>

									<div>
										<label htmlFor="mail">Mail:</label>
										<input
											id="mail"
											type="text"
											onChange={(e) => setMail(e.target.value)}
											></input>
									</div>

									<div>
										<input
											type="submit"
											value="Login"
											className="button"
											></input>
									</div>
								</form>
							</section>
						</main>
					</div>
				</div>
			</main>
		</>
  );
}
