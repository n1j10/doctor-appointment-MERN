import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { X } from "lucide-react";

const MyAppointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/appointments/myAppointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch appointments");
        setAppointments(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/deleteAppointment/${id}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to cancel appointment");
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error cancelling appointment");
    }
  };

  if (!user)
    return <div className="flex items-center justify-center h-screen text-xl">Login to view appointments</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#008e9b]">My Appointments</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="space-y-6 max-w-3xl mx-auto">
        {appointments.map((app) => (
          <div key={app._id} className="flex items-center justify-between bg-white shadow p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src={`http://localhost:5000/uploads/${app.doctor?.image || "default.png"}`}
                alt={app.doctor?.name}
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-xl font-semibold">{app.doctor?.name}</h3>
                <p className="text-gray-600">{app.reason}</p>
                <p className="text-sm text-gray-500">{new Date(app.date).toLocaleDateString()}</p>
              </div>
            </div>
            <button onClick={() => cancelAppointment(app._id)} className="text-red-500 hover:text-red-700">
              <X size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
