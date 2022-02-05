import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from "./components/registerFrom";
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard';
import PersonDetails from './components/person.details';

export default function App() {

  return (
      <Routes>
        <Route path="/" element={<RegisterForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/dashboard/:id" element={<Dashboard/>}/>
        <Route path="/person/:id" element={<PersonDetails/>}/>
      </Routes>
  );
}