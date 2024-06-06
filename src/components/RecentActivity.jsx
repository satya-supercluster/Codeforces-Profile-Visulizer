import React, { useState, useEffect } from "react";

const ProblemStats = ({ problemData }) => {
  const [averageRatingWeek, setAverageRatingWeek] = useState(0);
  const [averageRatingMonth, setAverageRatingMonth] = useState(0);
  const [numProblemsSolvedWeek, setNumProblemsSolvedWeek] = useState(0);
  const [numProblemsSolvedMonth, setNumProblemsSolvedMonth] = useState(0);
  const [uniqueProblemsSolvedWeek, setUniqueProblemsSolvedWeek] = useState(0);
  const [uniqueProblemsSolvedMonth, setUniqueProblemsSolvedMonth] = useState(0);
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

      const uniqueProblemsWeek = new Set();
      const uniqueRatingsWeek = [];
      const uniqueProblemsMonth = new Set();
      const uniqueRatingsMonth = [];

      problemsFromPastWeek.forEach((problem) => {
        const date = new Date(problem.creationTimeSeconds * 1000);
        const problemKey = `${problem.problem.contestId}-${problem.problem.index}`;
        if (!uniqueProblemsWeek.has(problemKey)) {
          uniqueProblemsWeek.add(problemKey);
          const rating = problem.problem?.rating;
          if (typeof rating === "number" && isFinite(rating)) {
            uniqueRatingsWeek.push(rating);
          }
        }
        activeDaysWeek.add(date.toDateString());
      });

      const totalRatingWeek = uniqueRatingsWeek.reduce(
        (sum, rating) => sum + rating,
        0
      );
      setAverageRatingWeek(
        uniqueRatingsWeek.length > 0
          ? (totalRatingWeek / uniqueRatingsWeek.length).toFixed(2)
          : 0
      );
      setUniqueProblemsSolvedWeek(uniqueProblemsWeek.size);

      problemsFromPastMonth.forEach((problem) => {
        const date = new Date(problem.creationTimeSeconds * 1000);
        const problemKey = `${problem.problem.contestId}-${problem.problem.index}`;
        if (!uniqueProblemsMonth.has(problemKey)) {
          uniqueProblemsMonth.add(problemKey);
          const rating = problem.problem?.rating;
          if (typeof rating === "number" && isFinite(rating)) {
            uniqueRatingsMonth.push(rating);
          }
        }
        activeDaysMonth.add(date.toDateString());
      });

      const totalRatingMonth = uniqueRatingsMonth.reduce(
        (sum, rating) => sum + rating,
        0
      );
      setAverageRatingMonth(
        uniqueRatingsMonth.length > 0
          ? (totalRatingMonth / uniqueRatingsMonth.length).toFixed(2)
          : 0
      );
      setUniqueProblemsSolvedMonth(uniqueProblemsMonth.size);
      setNumProblemsSolvedWeek(problemsFromPastWeek.length);
      setNumProblemsSolvedMonth(problemsFromPastMonth.length);
      setActiveDaysWeek(activeDaysWeek);
      setActiveDaysMonth(activeDaysMonth);
    }
  }, [problemData]);

  return (
    <div className="mt-10 flex flex-col gap-2 w-full sm:w-[75%] lg:w-[65%]">
      <h1 className="text-xl text-center mb-2 font-bold">Problems Stats</h1>
      <div className="grid grid-cols-2 max-[400px]:grid-cols-1 gap-10 max-[400px]:gap-5">
        <div className="bg-slate-300 p-4 rounded-lg">
          <h2 className="text-xl text-center font-bold mb-2">Past Week</h2>
          <p>
            <h1 className="text-sm font-semibold">
              Average Rating: {averageRatingWeek}
            </h1>
          </p>
          <p>
            <h1 className="text-sm font-semibold">
              Number of Submissions: {numProblemsSolvedWeek}
            </h1>
          </p>
          <p>
            <h1 className="text-sm font-semibold">
              Problems Tried: {uniqueProblemsSolvedWeek}
            </h1>
          </p>
          <p>
            <h1 className="text-sm font-semibold">
              Active Days: {activeDaysWeek.size}
            </h1>
          </p>
        </div>
        <div className="bg-slate-300 p-4 rounded-lg">
          <h2 className="text-xl text-center font-bold mb-2">Past Month</h2>
          <p>
            <h1 className="text-sm font-semibold">
              Average Rating: {averageRatingMonth}
            </h1>
          </p>
          <p>
            <h1 className="text-sm font-semibold">
              Number of Submissions: {numProblemsSolvedMonth}
            </h1>
          </p>
          <p>
            <h1 className="text-sm font-semibold">
              Problems Tried: {uniqueProblemsSolvedMonth}
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
