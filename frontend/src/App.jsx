import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Divestream from "./pages/Divestream.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/divestream" element={<Divestream />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
