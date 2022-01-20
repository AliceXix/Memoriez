import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from "./components/registerFrom";
import LoginForm from './components/loginForm';

export default function App() {

  return (
      <Routes>
        <Route path="/" element={<RegisterForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
      </Routes>
  );
}