import React, { useState } from "react";

const RecentContests = ({ contestData }) => {
  const lastFiveContests = contestData.slice(-5);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="text-xl text-center mb-2 font-bold">Contests Stats</h1>
      <div className="bg-slate-300 p-6 rounded-lg mb-6 w-full md:w-[70%] lg:w-[65%]">
        <h2 className="text-xl max-[400px]:text-sm font-bold mb-4">
          Last 5 Contests
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {[...lastFiveContests].reverse().map((contest, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">
                {contest.contestName}
              </h3>
              <p className="text-gray-600">
                Rank: <span className="font-semibold">{contest.rank}</span>
              </p>
              <p
                className={`font-semibold ${
                  contest.newRating > contest.oldRating
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Rating:{" "}
                <span className="font-semibold">
                  {contest.oldRating} → {contest.newRating}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-300 max-[400px]:text-sm p-6 rounded-lg w-full md:w-[70%] lg:w-[65%]">
        <h2 className="text-xl max-[400px]:text-sm font-bold mb-4 flex items-center justify-between">
          <span>All Contest Details</span>
          <button
            className="text-gray-500 hover:text-gray-700 max-[400px]:text-sm transition-colors duration-300"
            onClick={toggleDetails}
          >
            {showDetails ? "Hide" : "Show"}
          </button>
        </h2>
        <p className="text-lg max-[400px]:text-sm font-semibold mb-4">
          Total Contests: {contestData.length}
        </p>
        {showDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...contestData].reverse().map((contest, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {contest.contestName}
                </h3>
                <p className="text-gray-600">Rank: {contest.rank}</p>
                <p
                  className={`font-semibold ${
                    contest.newRating > contest.oldRating
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Rating:{" "}
                  <span className="font-semibold">
                    {contest.oldRating} → {contest.newRating}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentContests;
