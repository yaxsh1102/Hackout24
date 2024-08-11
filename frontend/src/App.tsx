import VirtualTour from "./components/VirtualTour";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import CreateProject from "./pages/CreateProject";
import PaymentGateway from "./pages/PaymentGateway";
import MyPurchase from "./pages/MyPurchase";
import SetProfile from "./pages/SetProfile";
import MyProjects from "./pages/MyProjects";
import ProjectInfo from "./pages/ProjectInfo";

function App() {
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/virtual-tour" element={<VirtualTour />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/pricing" element={<Pricing />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/setProfile" element={<SetProfile />} />
				<Route path="/create-project" element={<CreateProject />} />
				<Route path= "/payment-gateway" element={<PaymentGateway/>}/>
				<Route path="/my-purchase" element={<MyPurchase></MyPurchase>}/>
				<Route path="/myprojects" element={<MyProjects />} />
				<Route path="/myprojects/:projectId" element={<ProjectInfo />} />
			</Routes>
		</BrowserRouter>
	);

export default App;
