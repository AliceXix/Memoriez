import * as React from 'react';
import { handleLogin } from '../handleLogin';

export default function LoginForm() {

const [mail, setMail] = React.useState("")
const [username, setUsername] = React.useState("");
const userInfo = {mail: mail, username: username}


 return (

    <>
    <div className="App">
      <header className="App-header">
        <p>
          Login here!
        </p>
        <form onSubmit={(e) => {e.preventDefault(); handleLogin(userInfo)}}>
          <label htmlFor='username'>Username:</label>
          <input id='username' type={'text'} onChange={(e) => setUsername(e.target.value)}></input>
          <br></br>
          <label htmlFor='mail'>Mail:</label>
          <input id='mail' type={'text'} onChange={(e) => setMail(e.target.value)}></input>
          <br></br>
          <input type={'submit'} value={'Login'}></input>
        </form>
      </header>
    </div>
    </>
 )
}