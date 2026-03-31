import { useEffect, useState } from "react";

const DepartmentsTabs = () => {
  const [departments, setDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    // جلب الأقسام من API
    fetch("http://localhost:5000/departments/allDepartments")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
        if (data.length > 0) setActiveTab(data[0]._id); // نحدد أول تاب افتراضي
      })
      .catch((err) => console.error("Failed to fetch departments", err));
  }, []);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  if (departments.length === 0) {
    return <p className="text-center p-4">Loading departments...</p>;
  }

  return (
    <section id="tabs" className="section py-12 bg-white max-w-6xl mx-auto px-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Departments</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore our specialized medical departments staffed with expert doctors.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs List */}
        <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 border-b md:border-b-0 md:border-r border-gray-300">
          {departments.map((dept) => (
            <li key={dept._id}>
              <button
                className={`block px-4 py-2 rounded-t md:rounded-tr-none md:rounded-l
                  ${
                    activeTab === dept._id
                      ? "bg-blue-600 text-white font-semibold"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
                onClick={() => handleTabClick(dept._id)}
              >
                {dept.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="flex-1 bg-gray-50 p-6 rounded shadow">
          {departments.map((dept) =>
            dept._id === activeTab ? (
              <div key={dept._id} className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-semibold mb-3">{dept.name}</h3>
                  <p className="italic mb-4">{dept.shortDescription || "..."}</p>
                  <p>{dept.description || "No description available."}</p>
                </div>
                <div className="md:w-1/3">
                  <img
                    src={dept.image || "/images/default-department.jpg"}
                    alt={dept.name}
                    className="rounded shadow-md object-cover w-full h-48 md:h-40"
                  />
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsTabs;
