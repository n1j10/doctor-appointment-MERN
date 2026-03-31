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
      const token = localStorage.getItem("token");
      
     
      const res = await fetch(`http://localhost:5000/appointments/deleteAppointment/${id}`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to cancel appointment");
      }
      
      // Remove the appointment from state
      setAppointments(appointments.filter((a) => a._id !== id));
      alert("Appointment cancelled successfully!");
      
    } catch (err) {
      console.error(err);
      alert(`Error cancelling appointment: ${err.message}`);
    }
  };

  if (!user)
    return <div className="flex items-center justify-center h-screen text-xl">Login to view appointments</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#008e9b]">My Appointments</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="space-y-6 max-w-3xl mx-auto">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found</p>
        ) : (
          appointments.map((app) => (
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
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to cancel this appointment?")) {
                    cancelAppointment(app._id);
                  }
                }}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                title="Cancel Appointment"
              >
                <X size={24} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;