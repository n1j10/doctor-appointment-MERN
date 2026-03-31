import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`http://localhost:5000/doctors/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch doctor details");
        setDoctor(data);
        fetchRelatedDoctors(data.specialty.toLowerCase(), data._id); // normalize specialty
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    const fetchRelatedDoctors = async (specialty, currentId) => {
      try {
        // Fixed URL - added the extra /doctors
        const res = await fetch(`http://localhost:5000/doctors/doctors/bySpecialty/${specialty}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch related doctors");
        // filter and normalize specialties for comparison
        const normalized = data.filter((doc) => doc._id !== currentId && doc.specialty.toLowerCase() === specialty);
        setRelatedDoctors(normalized);
      } catch (err) {
        console.error("Error fetching related doctors:", err);
      }
    };

    fetchDoctor();
  }, [id]);

  if (error)
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  if (!doctor)
    return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="md:col-span-2 flex flex-col md:flex-row items-center">
        <img
          src={`http://localhost:5000/uploads/${doctor.image || "default.png"}`}
          alt={doctor.name}
          className="w-64 h-64 object-cover rounded-lg shadow-md mb-6 md:mb-0 md:mr-10"
        />
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-[#008e9b]">{doctor.name}</h2>
          <p className="text-xl text-gray-700">Specialty: {doctor.specialty}</p>
          <p className="text-gray-600">Experience: {doctor.experienceYears} years</p>
          <p className="text-gray-600 leading-relaxed">{doctor.description}</p>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-[#008e9b]">Other {doctor.specialty} Doctors</h3>
        <div className="space-y-4">
          {relatedDoctors.length > 0 ? (
            relatedDoctors.map((doc) => (
              <Link
                to={`/doctor/${doc._id}`}
                key={doc._id}
                className="flex items-center bg-white rounded-lg shadow p-3 hover:shadow-md transition"
              >
                <img
                  src={`http://localhost:5000/uploads/${doc.image || "default.png"}`}
                  alt={doc.name}
                  className="w-16 h-16 rounded-full object-cover border mr-4"
                />
                <div>
                  <h4 className="text-lg font-medium">{doc.name}</h4>
                  <p className="text-gray-500 text-sm">Experience: {doc.experienceYears} years</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No related doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;