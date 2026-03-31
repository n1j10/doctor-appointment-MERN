import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import AddAppointment from "./pages/AddAppointment";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import AddDoctor from "./pages/AddDoctor";

function App() {
  return (
    <>
    <Navbar/>
    
    <Routes>
    <Route index path="/" element={<Home/>}/>
    <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
    <Route path="/add-appointment" element={<AddAppointment />} />
    <Route path="/add-doctor" element={<AddDoctor />} />


    </Routes>
    
   
    </>
  );
}

export default App;
