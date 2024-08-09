import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VirtualTour from "./components/VirtualTour";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/virtual-tour" element={<VirtualTour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
