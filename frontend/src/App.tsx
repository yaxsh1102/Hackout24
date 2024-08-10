import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/pricing" element={<Pricing></Pricing>}></Route>
			</Routes >
		</BrowserRouter >
	);
}

export default App;
