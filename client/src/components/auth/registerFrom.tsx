import * as React from "react";

export default function RegisterForm() {
  const [mail, setMail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const userInfo = { mail: mail, username: username };

  async function handleRegister(userInfo: any) {
    const fetcher = await fetch("http://localhost:3000/api/register", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userInfo),
    });
    const newUser = await fetcher.json();
    return newUser;
  }

  return (
    <>
      <header className="row-items">
        <h1>Memoriez</h1>
        <a href="/login">Login</a>
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
              <h1>Register here!</h1>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleRegister(userInfo);
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
                    value={"Register"}
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
