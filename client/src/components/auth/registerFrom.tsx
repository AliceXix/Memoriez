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
      <div className="App">
        <header className="App-header">
          <p>Register here!</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
             await handleRegister(userInfo);
            }}
          >
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type={"text"}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <br></br>
            <label htmlFor="mail">Mail:</label>
            <input
              id="mail"
              type={"text"}
              onChange={(e) => setMail(e.target.value)}
            ></input>
            <br></br>
            <input type={"submit"} value={"Register"}></input>
          </form>
        </header>
      </div>
    </>
  );
}
