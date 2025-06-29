import { useState, useEffect } from "react";
import axios from "axios";
import AddNewStudent from "./AddNewStudent";
import "../style.css"
const Dashboard=()=> {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // If editing, store student ID
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    handle: "",
  });
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Edit mode
        await axios.put(`http://localhost:5000/students/${editingId}`, formData);
      } else {
        // Add mode
        await axios.post("http://localhost:5000/students", formData);
      }
      fetchStudents();
      resetForm();
    } catch (err) {
      console.error("Error submitting student:", err);
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingId(student._id);
    setShowForm(true);
  };
  
  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  };
  
  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", handle: "" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <button
        // onClick={() => {
        //   resetForm();
        //   setShowForm(true);
        // }}
         onClick={() => {
         <AddNewStudent/>
        }}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-4"
      >
        Add New Student
      </button>
      <button 
      // onClick={()=>{<CSV/>}}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-4 ml-120"
      >
        Download CSV
      </button>

      <ul className="space-y-4 mb-8">
        {students.map((student) => (
          <li
            key={student._id}
            className="p-4 bg-white shadow rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Name:{student.name}</p>
              <p className="text-sm text-gray-600">Email:{student.email}</p>
              <p className="text-sm text-gray-600">Phone:{student.phone}</p>
              <p className="text-sm text-gray-600">CF Handle:{student.handle}</p>
            </div>
            <div className="flex gap-2">
               <button
               
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                More-Details
              </button>
              <button
                onClick={() => handleEdit(student)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteStudent(student._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showForm && (
        <form
          onSubmit={handleAddStudent}
          className="space-y-4 bg-gray-100 p-6 rounded shadow"
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border px-4 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Codeforces Handle"
            value={formData.handle}
            onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
            className="w-full border px-4 py-2"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
              {editingId ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
export default Dashboard;
