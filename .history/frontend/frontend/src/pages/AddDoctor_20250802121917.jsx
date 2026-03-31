import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AddDoctor = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    experienceYears: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("specialty", form.specialty);
      formData.append("experienceYears", form.experienceYears);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);

      const res = await fetch("http://localhost:5000/doctors/addDoctor", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      console.log("Response status:", res.status, "Response data:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to add doctor");
      }

      alert("Doctor added successfully!");
      setForm({ name: "", specialty: "", experienceYears: "", description: "", image: null });
      setPreview(null);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.message);
    }
  };

  if (!user || user.role !== "admin") {
    return <div className="flex items-center justify-center h-screen text-xl">Only admin can add doctors.</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-8" encType="multipart/form-data">
        <div className="flex flex-col items-center w-1/3">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
            {preview ? (
              <img src={preview} alt="Preview" className="object-cover w-full h-full" />
            ) : (
              <img src="./img/doctors/avatar.png" alt="Default Avatar" className="object-cover w-full h-full" />
            )}
          </div>
          <button className="cursor-pointer  text-white px-4 py-2 rounded ">
            Choose Image
            <input type="file" name="image" onChange={handleChange} accept="image/*" className="hidden" />
          </button>
        </div>

        <div className="w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Add New Doctor</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <label className="block mb-2 font-semibold">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full mb-4 p-2 border rounded" />

          <label className="block mb-2 font-semibold">Specialty</label>
          <input type="text" name="specialty" value={form.specialty} onChange={handleChange} required className="w-full mb-4 p-2 border rounded" />

          <label className="block mb-2 font-semibold">Experience Years</label>
          <input type="number" name="experienceYears" value={form.experienceYears} onChange={handleChange} required className="w-full mb-4 p-2 border rounded" />

          <label className="block mb-2 font-semibold">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required className="w-full mb-4 p-2 border rounded" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
