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



function refineRating(data) {
  let res = {};
  for (let problem of data) {
    if (problem.verdict !== "OK") continue;
    if (res[problem.problem.rating]) res[problem.problem.rating]++;
    else res[problem.problem.rating] = 1;
  }
  // Convert the object to an array of key-value pairs
  const sortedData = Object.entries(res);

  // Sort the array based on the values (tag counts)
  sortedData.sort((a, b) => a[0] - b[0]);

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



const colors = [
  "#FF5733",
  "#3433FF",
  "#C70039",
  "#050C9C",
  "#26355D",
  "#005C78",
  "#FF9A00",
  "#FF0000",
  "#006769",
  "#002379",
  "#003C43",
  "#1B3C73",
  "#280274",
  "#050C9C",
  "#3572EF",
  "#3ABEF9",
  "#A7E6FF",
  "#FC4100",
  "#FFC55A",
  "#00215E",
  "#2C4E80",
];
const getColor = () => colors[Math.floor(Math.random() * colors.length)];



const TagChart = ({ userProblems }) => {
  const chartData = refineData(userProblems);
  const colors = Object.keys(chartData).map((key) => {
    return getColor();
  });


  const problemData = refineRating(userProblems);
  const pColors = Object.keys(problemData).map((key) => {
    return getColor();
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


  const problemChartInput = {
    labels: Object.keys(problemData),
    datasets: [
      {
        label: "Solved",
        data: Object.values(problemData),
        backgroundColor: pColors,
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
        <h1 className="text-xl text-center mb-2 font-bold">Problems Ratings</h1>
        <div className="w-[100%] flex justify-center lg:w-[65%]">
          <Bar data={problemChartInput} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-xl text-center mb-2 font-bold">Tag Chart</h1>
        <div className="w-[100%] flex justify-center lg:w-[65%]">
          <Bar data={chartInput} />
        </div> 
      </div>
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <div className="w-[75%] flex justify-center lg:w-[25%]">
          <Pie data={pie} />
        </div>
        <div className="text-sm text-center mb-2 font-semibold">
          Total Submissions={total}<br/>
          Accuracy={accuracy.toPrecision(4)}%
        </div>
      </div>
    </>
  );
};
export default TagChart;
