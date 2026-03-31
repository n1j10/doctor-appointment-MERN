import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // قراءة بيانات المستخدم من localStorage
    const tokenData = localStorage.getItem("userRole"); 
    if (tokenData) {
      setRole(tokenData); // مثلاً: "admin" أو "user"
    }
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg flex items-center justify-between">
      <div className="font-bold text-xl">
        <Link to="/">Medicio</Link>
      </div>
      <ul className="flex space-x-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>

        {role === "admin" && (
          <>
            <li><Link to="/add-department">Add Department</Link></li>
            <li><Link to="/add-doctor">Add Doctor</Link></li>
          </>
        )}

        {role === "user" && (
          <li><Link to="/add-appointment">Add Appointment</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
