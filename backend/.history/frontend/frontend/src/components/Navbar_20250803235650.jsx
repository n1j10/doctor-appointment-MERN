import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-white shadow-md text-[#008e9b] flex justify-between items-center px-6 py-3">
      {/* Logo */}
      <div>
        <img className="w-32" src="./logo.png" alt="Logo" />
      </div>

      {/* Main Links */}
      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Services</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>

        {/* User / Admin Menu */}
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              className="focus:outline-none"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <img
                src="/default-avatar.png" // ضع صورة البروفايل الفعلية إذا كانت موجودة
                alt="Profile"
                className="w-10 h-10 rounded-full border"
              />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                <ul className="py-2 text-gray-700">
                  {user?.role === "admin" && (
                    <>
                      <li>
                        <Link
                          to="/add-doctor"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Add Doctor
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Add Department
                        </Link>
                      </li>
                    </>
                  )}

                  {user?.role === "user" && (
                    <>
                      <li>
                        <Link
                          to="/add-appointment"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Add Appointment
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/my-appointments"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Appointments
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
