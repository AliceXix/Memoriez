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
      <header className="row-items">
        <h1>Memoriez</h1>
        <a href="/">Register</a>
      </header>

      <div className="split left">
        <div className="centered">
          <h2>Other component</h2>
          <p>App explanation</p>
        </div>
      </div>

      <div className="split right">
        <div className="centered">
          <main>
            <section>
              <h1>Login here!</h1>
              <form
                onSubmit={async (e) => {
                  handleSubmit(e);
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
                <div className="simple-center">
                  <input
                    type={"submit"}
                    value={"Login"}
                    className="button"
                  ></input>
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
