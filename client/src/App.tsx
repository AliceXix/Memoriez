import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from "./components/registerFrom";

export default function App() {

  return (
    <Routes>
        <Route path="/" element={<RegisterForm/>}/>
        </Routes>
  );
}