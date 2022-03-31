import * as React from "react";
import { useNavigate } from "react-router-dom";

interface LoginOutput {
  id: string;
}

export default function LoginForm() {
  const [mail, setMail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const userInfo: { mail: string; username: string } = {
    mail: mail,
    username: username,
  };
  const navigate = useNavigate();

  async function handleLogin(userInfo: any) {
    const fetcher = await fetch("http://localhost:3000/api/login", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userInfo),
    });
    const data: LoginOutput = await fetcher.json();
    return data;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let newUrl = await handleLogin(userInfo);
    localStorage.setItem("userId", newUrl.id);
    navigate(`/app/dashboard/${newUrl.id}`);
  }

  return (
    <>
      <main className="main">
        <section className="box">
          <h2>Login here!</h2>
          <form
            onSubmit={async (e) => {
              handleSubmit(e)
            }}
          >
            <div className="input">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type={"text"}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="input">
              <label htmlFor="mail">Mail:</label>
              <input
                id="mail"
                type={"text"}
                onChange={(e) => setMail(e.target.value)}
              ></input>
            </div>
            <input type={"submit"} value={"Login"} className="button"></input>
          </form>
        </section>
      </main>
    </>
  );
}
