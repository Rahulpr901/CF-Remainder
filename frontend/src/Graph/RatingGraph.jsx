import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const RatingGraph = ({ ratingData }) => {
  const formattedData = ratingData.map(contest => ({
    name: contest.contestName,
    rating: contest.newRating,
    date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
  }));
  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold">Rating Graph</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis dataKey="date" />
          <YAxis domain={['dataMin-100', 'dataMax+100']} />
          <Tooltip />
          <Line type="monotone" dataKey="rating" stroke="#007bff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default RatingGraph;
