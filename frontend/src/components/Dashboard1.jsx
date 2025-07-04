import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import AddNewStudent from "./AddNewStudent";
import "../style.css"
const Dashboard1=()=> {
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
        onClick={() => {
          resetForm();
          setShowForm(true);
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
          ><Card student={student} deleteStudent={deleteStudent} handleEdit={handleEdit}/></li>
        ))}
      </ul>
        <AddNewStudent
          formData={formData}
          setFormData={setFormData}
          handleAddStudent={handleAddStudent}
          resetForm={resetForm}
          editingId={editingId}
          showForm={showForm}
        />
    </div>
  );
}
export default Dashboard1;
