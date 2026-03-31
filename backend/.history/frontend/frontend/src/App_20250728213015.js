import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Navbar/>
    
    <Routes>
    <Route index path="/" element={<Home/>}/>
    <Route path="/login" element={<Login />} />

    </Routes>
    
   
    </>
  );
}

export default App;
