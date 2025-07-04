import React, { useState } from "react";

const ProblemStats = ({ submissions }) => {
  const [filterDays, setFilterDays] = useState(30);
  const now = Date.now();
  const filtered = submissions.filter(
    s =>
      s.verdict === "OK" &&
      s.creationTimeSeconds * 1000 >= now - filterDays * 24 * 60 * 60 * 1000
  );

  const uniqueSolved = new Map();
  filtered.forEach(s => {
    const key = `${s.problem.contestId}-${s.problem.index}`;
    if (!uniqueSolved.has(key)) uniqueSolved.set(key, s.problem);
  });

  const total = uniqueSolved.size;
  const ratings = Array.from(uniqueSolved.values()).map(p => p.rating || 0);
  const avgRating =
    ratings.reduce((a, b) => a + b, 0) / (ratings.length || 1);
  const hardest = ratings.length
    ? Math.max(...ratings)
    : "N/A";

  const problemsPerDay = (total / filterDays).toFixed(2);

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-2">Problem Solving Insights</h3>
      <div className="flex gap-2 mb-2">
        {[7, 30, 90].map(days => (
          <button
            key={days}
            onClick={() => setFilterDays(days)}
            className={`px-3 py-1 rounded ${
              filterDays === days ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Last {days} days
          </button>
        ))}
      </div>
      <ul className="list-disc list-inside">
        <li>Total Problems Solved: {total}</li>
        <li>Most Difficult Problem Rating: {hardest}</li>
        <li>Average Rating: {avgRating.toFixed(1)}</li>
        <li>Average Problems/Day: {problemsPerDay}</li>
      </ul>
    </div>
  );
};

export default ProblemStats;
