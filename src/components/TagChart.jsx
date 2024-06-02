import React from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
function refineData(data) {
  let res = {};
  for (let problem of data) {
    if (problem.verdict !== "OK") continue;
    for (let tag of problem.problem.tags) {
      if (res[tag]) res[tag]++;
      else res[tag] = 1;
    }
  }
  // Convert the object to an array of key-value pairs
  const sortedData = Object.entries(res);

  // Sort the array based on the values (tag counts)
  sortedData.sort((a, b) => b[1] - a[1]);

  // Convert the sorted array back to an object
  res = Object.fromEntries(sortedData);

  return res;
}

function getAccuracy(data) {
  let accepted = 0,
    total = 0;
  for (let problem of data) {
    if (problem.verdict == "OK") accepted++;
    total++;
  }
  return [accepted, total];
}

const TagChart = ({ userProblems }) => {
    console.log(userProblems);
  const chartData = refineData(userProblems);
  const colors = Object.keys(chartData).map((key) => {
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;
    return `rgb(${r}, ${g}, ${b})`;
  });
  const chartInput = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "Solved",
        data: Object.values(chartData),
        backgroundColor: colors,
      },
    ],
  };
  const [accepted, total] = getAccuracy(userProblems);
  const accuracy = (100 * accepted) / total;
  const pie = {
    labels: ["Accepted", "Wrong Answer"],
    datasets: [
      {
        label: "Submissions",
        data: [accepted, total - accepted],
        backgroundColor: ["green", "red"],
      },
    ],
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-xl text-center mb-2 font-bold">Tag Chart</h1>
        <div className="w-[100%] flex justify-center lg:w-[65%]">
          <Bar data={chartInput} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <div className="w-[100%] flex justify-center lg:w-[25%]">
          <Pie data={pie} />
        </div>
        <div className="text-lg text-center mb-2 font-semibold">
          Accuracy={accuracy.toPrecision(4)}%
        </div>
      </div>
    </>
  );
};
export default TagChart;
