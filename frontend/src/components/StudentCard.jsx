import React from 'react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow p-4 rounded-xl mb-4">
      <div className="font-semibold text-lg">{student.name}</div>
      <div className="text-sm text-gray-600">{student.email}</div>
      <div className="mt-2 text-sm">
        <strong>Handle:</strong> {student.handle} <br />
        <strong>Rating:</strong> {student.rating} <br />
        <strong>Max Rating:</strong> {student.maxRating} <br />
        <strong>Avg. Prob/Day:</strong> {student.avgProbPerDay} <br />
        <strong>Reminders Sent:</strong> {student.remindersSent} <br />
        <strong>Last Update:</strong> {student.lastUpdate}
      </div>
      <div className="mt-2 space-x-2">
        <button onClick={() => onEdit(student)} className="bg-black text-white px-3 py-1 rounded-md">Edit</button>
        <button onClick={() => onDelete(student._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
      </div>
    </div>
  );
};
export default StudentCard;
