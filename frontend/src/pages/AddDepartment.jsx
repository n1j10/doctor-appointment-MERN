import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import API_URL from '../config/api'

function AddDepartment() {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      image: null,
    });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError("Department name is required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add a department.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());
      if (form.image) formData.append("image", form.image);

      const res = await fetch(`${API_URL}/departments/addDepartments`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to add department");
      }

      toast.success("Department added successfully!");
      resetForm();
    } catch (submitError) {
      const message = submitError?.message || "Failed to add department";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-lg text-center">
          <h2 className="text-2xl font-bold mb-3 text-[#008e9b]">Admin Access Required</h2>
          <p className="text-gray-700">Only admin users can add new departments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <h2 className="text-3xl font-bold text-[#008e9b] mb-2">Add Department</h2>
          <p className="text-gray-600 mb-6">
            Create a new department with description and image.
          </p>

          <label className="block mb-2 font-semibold">Department Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border rounded"
            placeholder="e.g. Cardiology"
          />

          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            className="w-full mb-4 p-3 border rounded resize-none"
            placeholder="Write a short description..."
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded bg-[#008e9b] text-white font-semibold hover:bg-[#007a85] disabled:opacity-70"
          >
            {isSubmitting ? "Adding..." : "Add Department"}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
            {preview ? (
              <img src={preview} alt="Department preview" className="w-full h-full object-cover" />
            ) : (
              <p className="text-gray-500">No image selected</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("departmentImageInput").click()}
            className="bg-[#008e9b] text-white px-5 py-2 rounded hover:bg-[#007a85]"
          >
            Choose Image
          </button>
          <input
            id="departmentImageInput"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      </form>
    </div>
  );
}

export default AddDepartment;
