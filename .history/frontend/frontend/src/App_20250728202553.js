import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./components/Login";
import Home from "./pages/Home";

function App() {
  return (
   <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
         
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
   </BrowserRouter>
  );
}

export default App;
