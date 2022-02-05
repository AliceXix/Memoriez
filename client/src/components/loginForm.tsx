import * as React from "react";
import { useNavigate } from "react-router-dom";

 interface LoginOutput {
   id: string
 }

export default function LoginForm() {
  const [mail, setMail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const userInfo: {mail: string, username: string} = { mail: mail, username: username };
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
    return data
  }


  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>Login here!</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              let newUrl = await handleLogin(userInfo);
              console.log(
                `this comes from the return statement ${newUrl.id}`
              );
              navigate(`/dashboard/${newUrl.id}`);
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
            <input type={"submit"} value={"Login"}></input>
          </form>
        </header>
      </div>
    </>
  );
}
