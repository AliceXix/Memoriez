import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/auth/registerFrom";
import LoginForm from "./components/auth/loginForm";
import GridLayout from "./components/main/grid";

export default function App() {
  return (
    <>
		<Routes>
			<Route path="/" element={<RegisterForm />} />
			<Route path="/login" element={<LoginForm />} />
			<Route path="/app/*" element={<GridLayout />} />
		</Routes>
    </>
  );
}
