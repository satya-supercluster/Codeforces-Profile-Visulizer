import React from "react";

const UserInfoGrid = ({ userInfo }) => {
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const colors = ["#FF5F00", "#3433FF", "#C70039"];
  const getColor = () => colors[Math.floor(Math.random() * colors.length)];

  const link = `https://codeforces.com/profile/${userInfo.handle}`;
  return (
    <div className="flex justify-center flex-col md:w-[70%] lg:w-[65%]">
      <div className="py-10 ">
        <p className="overflow-hidden flex justify-center items-center">
          <a href={link}>
            <img
              src={userInfo.titlePhoto}
              alt="Avatar"
              className=" h-28 sm:h-56 rounded-lg object-contain"
            />
          </a>
        </p>
        <p style={{ color: getColor() }} className="text-center">
          <span className="font-bold text-xl underline">
            <a href={link}>
              {userInfo.firstName} {userInfo.lastName}
            </a>
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-orange-700 flex justify-center items-center">
          <img
            src={userInfo.titlePhoto}
            alt="Title Photo"
            className="w-full h-full object-cover"
          />
        </div> */}
        <div className=" bg-slate-300 rounded-lg shadow-md p-4 flex flex-col ">
          <h3 className="text-lg font-bold mb-2 text-center">Personal Info</h3>
          <div className="flex flex-col justify-center text-lg">
            <p style={{ color: getColor() }}>
              <span className="font-bold">Name:</span> {userInfo.firstName}{" "}
              {userInfo.lastName}
            </p>
            <p style={{ color: getColor() }}>
              <span className="font-bold">City:</span> {userInfo.city}
            </p>
            <p style={{ color: getColor() }}>
              <span className="font-bold">Country:</span> {userInfo.country}
            </p>
            <p style={{ color: getColor() }}>
              <span className="font-bold">Organization:</span>{" "}
              {userInfo.organization}
            </p>
          </div>
        </div>
        <div className="bg-slate-300 rounded-lg shadow-md p-4 flex flex-col justify-center ">
          <h3 className="text-lg font-bold mb-2 text-center">
            Codeforces Info
          </h3>
          <div className="flex flex-col justify-center text-lg">
            <p style={{ color: getColor() }}>
              <span className="font-bold">Handle:</span> {userInfo.handle}
            </p>
            <p style={{ color: getColor() }}>
              <span className="font-bold">Rating:</span> {userInfo.rating}
            </p>
            <p style={{ color: getColor() }}>
              <span className="font-bold">Max Rating:</span>{" "}
              {userInfo.maxRating}
            </p>
            <p style={{ color: getColor() }}>
              <span className="font-bold">Rank:</span> {userInfo.rank}
            </p>
            <p style={{ color: getColor() }}>
              <span className="font-bold">Max Rank:</span> {userInfo.maxRank}
            </p>
            <p style={{ color: getColor() }}>
              <span className="font-bold">FriendsOfCount:</span>{" "}
              {userInfo.friendOfCount}
            </p>
            <p style={{ color: getColor() }}>
              <span className="font-bold">Registration Time:</span>{" "}
              {new Date(
                userInfo.registrationTimeSeconds * 1000
              ).toLocaleString()}
            </p>
            <p style={{ color: getColor() }}>
              <span className="font-bold">Last Online:</span>{" "}
              {new Date(userInfo.lastOnlineTimeSeconds * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoGrid;
