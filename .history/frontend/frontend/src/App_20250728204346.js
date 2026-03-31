import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Navbar/>

    <Routes>
    <Route index path="/" element={<Home/>}/>
    
    </Routes>
    
   
    </>
  );
}

export default App;
