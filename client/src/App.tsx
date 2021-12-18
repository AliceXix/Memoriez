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
          <label>Username:</label>
          <input type="text"></input>
          <br></br>
          <label>Mail:</label>
          <input type="text"></input>
        </form>
      </header>
    </div>
  );
}

export default App;
