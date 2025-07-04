import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RatingGraph from "../Graph/RatingGraph";
import ContestHistory from "../Graph/ContestHistory";
import ProblemStats from "../Graph/ProblemStats";
import ProblemBarChart  from "../Graph/ProblemBarChart";
const StudentDetails = () => {
  const location = useLocation();
  const student = location.state?.student;
  const [ratingData, setRatingData] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCFData = async () => {
      if (!student) return;

      try {
        // 1. Fetch Codeforces rating history
        const ratingRes = await axios.get(
          `https://codeforces.com/api/user.rating?handle=${student.handle}`
        );
        setRatingData(ratingRes.data.result);

        // 2. Fetch Codeforces submissions
        const submissionRes = await axios.get(
          `https://codeforces.com/api/user.status?handle=${student.handle}&from=1&count=10000`
        );
        setSubmissionData(submissionRes.data.result);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Codeforces data:", error);
      }
    };

    fetchCFData();
  }, [student]);

  if (!student) return <div className="p-4 text-red-600">Student data missing</div>;
  if (loading) return <div className="p-5 text-lg">Loading Codeforces data...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">
        {student.name}'s Codeforces Analytics
      </h2>
      <p className="text-sm text-gray-600">Email: {student.email}</p>
      <p className="text-sm text-gray-600">Phone: {student.phone}</p>
      <p className="text-sm text-gray-600">Handle: {student.handle}</p>

      <RatingGraph ratingData={ratingData} />
      <ProblemBarChart problemStats={submissionData} />
      <ContestHistory contests={ratingData} />
      <section className="my-8">
      </section>

      <ProblemStats submissions={submissionData} />
      <section className="my-8">
      </section>
    </div>
  );
};

export default StudentDetails;
