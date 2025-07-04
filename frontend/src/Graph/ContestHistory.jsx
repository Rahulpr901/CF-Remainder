import React, { useState } from "react";

const getDaysAgo = days => Date.now() - days * 24 * 60 * 60 * 1000;

const ContestHistory = ({ contests }) => {
  const [filter, setFilter] = useState(90);

  const filteredContests = contests.filter(
    c => c.ratingUpdateTimeSeconds * 1000 >= getDaysAgo(filter)
  );

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Contest History</h3>
      <div className="mb-2 flex gap-2">
        {[30, 90, 365].map(days => (
          <button
            key={days}
            onClick={() => setFilter(days)}
            className={`px-3 py-1 rounded ${
              filter === days ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Last {days} days
          </button>
        ))}
      </div>
      <ul className="space-y-1">
        {filteredContests.map((c, i) => (
          <li key={i} className="border p-2 rounded">
            <p className="font-semibold">{c.contestName}</p>
            <p>Rank: {c.rank}</p>
            <p>Rating: {c.oldRating} → {c.newRating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContestHistory;
