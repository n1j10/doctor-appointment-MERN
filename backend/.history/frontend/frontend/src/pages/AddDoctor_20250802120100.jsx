import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AddDoctor = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("specialty", form.specialty);
    formData.append("experienceYears", form.experienceYears);
    if (form.image) formData.append("image", form.image);

    const res = await fetch("http://localhost:5000/doctors/addDoctors", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Doctor added successfully!");
      setForm({
        name: "",
        description: "",
        experienceYears: "",
        description:"",
        specialty:"",
        image: null,
      });
    } else {
      alert(data.message || "Failed to add doctor");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Only admin can add doctors.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Add New Doctor
        </h2>

        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 font-semibold">specialty</label>
        <input
          type="text"
          name="specialty"
          value={form.specialty}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 font-semibold">experienceYears</label>
        <input
          type="experienceYears"
          name="experienceYears"
          value={form.experienceYears}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 font-semibold">description</label>
        <textarea
          type="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 font-semibold">Doctor Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
