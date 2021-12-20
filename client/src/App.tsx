import React from 'react';
import './App.css';
import { handleFormSubmit } from './handleFormSubmit'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Register here!
        </p>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor='username'>Username:</label>
          <input id='username' type={'text'}></input>
          <br></br>
          <label htmlFor='mail'>Mail:</label>
          <input id='mail' type={'text'}></input>
          <br></br>
          <input type={'submit'} value={'Register'}></input>
        </form>
      </header>
    </div>
  );
}

export default App;
