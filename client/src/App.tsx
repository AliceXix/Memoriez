import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Register here!
        </p>
        <form>
          <label htmlFor='username'>Username:</label>
          <input type="text"></input>
          <br></br>
          <label htmlFor='mail'>Mail:</label>
          <input type="text"></input>
        </form>
      </header>
    </div>
  );
}

export default App;
