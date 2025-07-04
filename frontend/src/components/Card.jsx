import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Card=({student, deleteStudent, handleEdit})=>{
  const navigate = useNavigate();
    const [cfData, setCfData] = useState({
    currentRating: null,
    maxRating: null,
  });
  useEffect(() => {
    const fetchAndStoreCFData = async () => {
      try {
        const res = await fetch(
          `https://codeforces.com/api/user.info?handles=${student.handle}`
        );
        const data = await res.json();
        if (data.status === "OK") {
          const user = data.result[0];
          const updatedData = {
            currentRating: user.rating ?? 0,
            maxRating: user.maxRating ?? 0,
          };
          setCfData(updatedData);
          // 🔥 Saving to MongoDB via backend
          await fetch(`/api/students/${student._id}/update-ratings`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          });
        }
      } catch (err) {
        console.error("Error fetching or updating CF data:", err);
      }
    };
    fetchAndStoreCFData();
  }, [student.handle, student._id]);
  return (
    <>
     <div>
              <p className="font-semibold">Name:{student.name}</p>
              <p className="text-sm text-gray-600">Email:{student.email}</p>
              <p className="text-sm text-gray-600">Phone:{student.phone}</p>
              <p className="text-sm text-gray-600">CF Handle:{student.handle}</p>
             <p className="text-sm text-gray-600">Current Rating:{cfData.currentRating ?? "Loading..."}</p>
             <p className="text-sm text-gray-600">Max Rating: {cfData.maxRating ?? "Loading..."}</p>
            </div>
            <div className="flex gap-2">
               <button onClick={() =>navigate(`/student/${student._id}/details`,{state:{student}})}
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
            </>
  );
}
export default Card;