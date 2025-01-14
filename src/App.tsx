import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
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
