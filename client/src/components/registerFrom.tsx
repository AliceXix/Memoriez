import * as React from 'react';
import { handleFormSubmit } from '../handleFormSubmit';
//import './registerFrom.css'

export default function RegisterForm() {

const [mail, setMail] = React.useState("")
const [username, setUsername] = React.useState("");
const userInfo = {mail: mail, username: username}


 return (

    <>
    <div className="App">
      <header className="App-header">
        <p>
          Register here!
        </p>
        <form onSubmit={(e) => {e.preventDefault(); handleFormSubmit(userInfo)}}>
          <label htmlFor='username'>Username:</label>
          <input id='username' type={'text'} onChange={(e) => setUsername(e.target.value)}></input>
          <br></br>
          <label htmlFor='mail'>Mail:</label>
          <input id='mail' type={'text'} onChange={(e) => setMail(e.target.value)}></input>
          <br></br>
          <input type={'submit'} value={'Register'}></input>
        </form>
      </header>
    </div>
    </>
 )
}