import React from 'react'
import { Line } from "react-chartjs-2";
const RatingGraph = ({userRatings,name}) => {
    let c = 0;
    const data = {
      labels: userRatings.map((rating) => ++c),
      datasets: [
        {
          label: name,
          data: userRatings.map((rating) => rating.newRating),
          backgroundColor: "rgb(0, 30, 50)",
          borderColor: "rgb(0, 122, 204)",
        },
      ],
    };
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="text-xl text-center font-bold mb-2">Rating Graph</div>
      <div className="w-[100%] flex justify-center lg:w-[65%]">
        <Line data={data} />
      </div>
    </div>
  );
}

export default RatingGraph