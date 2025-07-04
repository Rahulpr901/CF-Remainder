// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const ProblemBarChart = ({ problemStats }) => {
//   if (!problemStats?.length) return <p>No problem data found.</p>;

//   const formattedData = problemStats.map((d) => ({
//     rating: Number(d?.rating ?? 0),
//     count: Number(d?.count ?? 0),
//   }));

//   console.log("Formatted Problem Stats", formattedData);

//   return (
//     <div className="my-6">
//       <h3 className="text-lg font-bold mb-2">Problems Solved by Difficulty</h3>
//       <div style={{ width: "100%", height: 300 }}>
//         <ResponsiveContainer>
//           <BarChart data={formattedData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="rating" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Bar dataKey="count" fill="#10b981" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ProblemBarChart;

//below one is working fine.
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Example: receiving problemStats as a prop or from API
const problemStats = {
  800: 2,
  900: 5,
  1000: 1,
  // ... other ratings
};

// ✅ Step 1: Transform the object into an array of objects
const formattedData = Object.entries(problemStats || {})
  .map(([rating, count]) => ({
    rating: Number(rating),
    count: Number(count),
  }))
  .filter((d) => d.count > 0); // Optional: remove bars with 0 count

// ✅ Step 2: Render the BarChart
const ProblemsSolvedByDifficulty = () => {
  return (
    <div>
      <h2>Problems Solved by Difficulty</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProblemsSolvedByDifficulty;

