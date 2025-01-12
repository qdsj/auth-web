import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
	return (
		<>
			<BrowserRouter basename='/authqdsj'>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/' element={<div>Auth Web</div>} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
