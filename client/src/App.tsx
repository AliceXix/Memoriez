import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from "./components/auth/registerFrom";
import LoginForm from './components/auth/loginForm';
import PersonDetails from './components/person.details';
import AddMemoryForm from './components/AddMemoryForm';
import AddPersonForm from './components/addPersonForm';
import MemoryDetails from './components/memory.details';
import GridLayout from './components/main/grid';

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/app/dashboard/:id" element={<GridLayout />} />

        <Route
          path="/app/person-details/:id"
          element={
            <GridLayout>
              <PersonDetails />
            </GridLayout>
          }
        />
        <Route path="/app/add-memory/:id" element={<AddMemoryForm />} />
        <Route
          path="/app/add-person/:id"
          element={
            <GridLayout>
              <AddPersonForm />
            </GridLayout>
          }
        />
        <Route
          path="/app/memory-details/:id"
          element={
            <GridLayout>
              <MemoryDetails />
            </GridLayout>
          }
        />
      </Routes>
    </>
  );
}