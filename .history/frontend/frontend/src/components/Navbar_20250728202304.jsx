import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
      <div className="font-bold text-xl">
        <a to="/">Medicio</a>
      </div>
      <ul className="flex space-x-6 items-center">
        <li><a to="/">Home</a></li>
        <li><a to="/about">About</a></li>

        {user?.role === "admin" && (
          <>
            <li><a to="/add-department">Add Department</a></li>
            <li><a to="/add-doctor">Add Doctor</a></li>
          </>
        )}
        {user?.role === "user" && <li><a to="/add-appointment">Add Appointment</a></li>}

        {!user && (
          <>
           <li>
  <Link 
    to="/login" 
    className="text-blue-500 hover:underline"
  >
    Login
  </Link>
</li>

            <li><a to="/signup">Signup</a></li>
          </>
        )}
        {user && <li><button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
