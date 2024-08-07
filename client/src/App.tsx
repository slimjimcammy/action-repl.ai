import { BrowserRouter, Routes, Route } from "react-router-dom";
import Divestream from "./pages/Divestream.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<a href="/divestream">Divestream</a>} />
        <Route path="/divestream" element={<Divestream />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
