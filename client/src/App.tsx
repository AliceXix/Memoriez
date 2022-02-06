import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from "./components/registerFrom";
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard';
import PersonDetails from './components/person.details';
import AddMemoryForm from './components/AddMemoryForm';
import AddPersonForm from './components/addPersonForm';

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard/:id" element={<Dashboard />} />
      <Route path="/person/:id" element={<PersonDetails />} />
      <Route path="/add-memory" element={<AddMemoryForm />} />
      <Route path="/add-person" element={<AddPersonForm/>}/>
    </Routes>
  );
}