import React, { useState, useEffect } from "react";

const ProblemStats = ({ problemData }) => {
  const [averageRatingWeek, setAverageRatingWeek] = useState(0);
  const [averageRatingMonth, setAverageRatingMonth] = useState(0);
  const [numProblemsSolvedWeek, setNumProblemsSolvedWeek] = useState(0);
  const [numProblemsSolvedMonth, setNumProblemsSolvedMonth] = useState(0);
  const [activeDaysWeek, setActiveDaysWeek] = useState(new Set());
  const [activeDaysMonth, setActiveDaysMonth] = useState(new Set());

  useEffect(() => {
    if (problemData && Array.isArray(problemData)) {
      const currentTime = new Date().getTime() / 1000;
      const oneWeekAgo = currentTime - 7 * 24 * 60 * 60;
      const oneMonthAgo = currentTime - 30 * 24 * 60 * 60;

      const problemsFromPastWeek = problemData.filter(
        (problem) => problem.creationTimeSeconds >= oneWeekAgo
      );
      const problemsFromPastMonth = problemData.filter(
        (problem) => problem.creationTimeSeconds >= oneMonthAgo
      );

      const ratingsWeek = problemsFromPastWeek
        .map((problem) => problem.problem?.rating)
        .filter((rating) => typeof rating === "number" && isFinite(rating));
      const totalRatingWeek = ratingsWeek.reduce(
        (sum, rating) => sum + rating,
        0
      );
      setAverageRatingWeek(
        ratingsWeek.length > 0
          ? (totalRatingWeek / ratingsWeek.length).toFixed(2)
          : 0
      );

      const ratingsMonth = problemsFromPastMonth
        .map((problem) => problem.problem?.rating)
        .filter((rating) => typeof rating === "number" && isFinite(rating));
      const totalRatingMonth = ratingsMonth.reduce(
        (sum, rating) => sum + rating,
        0
      );
      setAverageRatingMonth(
        ratingsMonth.length > 0
          ? (totalRatingMonth / ratingsMonth.length).toFixed(2)
          : 0
      );

      setNumProblemsSolvedWeek(problemsFromPastWeek.length);
      setNumProblemsSolvedMonth(problemsFromPastMonth.length);

      const daysWeek = new Set();
      problemsFromPastWeek.forEach((problem) => {
        const date = new Date(problem.creationTimeSeconds * 1000);
        daysWeek.add(date.toDateString());
      });
      setActiveDaysWeek(daysWeek);

      const daysMonth = new Set();
      problemsFromPastMonth.forEach((problem) => {
        const date = new Date(problem.creationTimeSeconds * 1000);
        daysMonth.add(date.toDateString());
      });
      setActiveDaysMonth(daysMonth);
    }
  }, [problemData]);

  return (
    <div className="mt-10 flex flex-col justify-around gap-2 md:w-[70%] lg:w-[55%]">
      <h1 className="text-xl text-center mb-2 font-bold">Problems Stats</h1>
      <div className="flex flex-col md:flex-row gap-5 md:gap-10">
        <div className="bg-slate-300 p-4 rounded-lg mr-4 flex-1">
          <h2 className="text-xl text-center font-bold mb-2">Past Week</h2>
          <p>
            <h1 className="text-sm font-semibold">
              Average Rating: {averageRatingWeek}
            </h1>
          </p>
          <p>
            <h1 className="text-sm font-semibold">
              Number of Problems Solved: {numProblemsSolvedWeek}
            </h1>
          </p>
          <p>
            <h1 className="text-sm font-semibold">
              Active Days: {activeDaysWeek.size}
            </h1>
          </p>
        </div>
        <div className="bg-slate-300 p-4 rounded-lg flex-1">
          <h2 className="text-xl text-center font-bold mb-2">Past Month</h2>
          <p>
            <h1 className="text-sm font-semibold">
              Average Rating: {averageRatingMonth}
            </h1>
          </p>
          <p>
            <h1 className="text-sm font-semibold">
              Number of Problems Solved: {numProblemsSolvedMonth}
            </h1>
          </p>
          <p>
            <h1 className="text-sm font-semibold">
              Active Days: {activeDaysMonth.size}
            </h1>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemStats;
