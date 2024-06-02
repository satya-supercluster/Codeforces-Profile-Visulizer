import React from "react";
const UserInfoGrid = ({ userInfo }) => {
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 10)];
    }
    return color;
  };
  let link = `https://codeforces.com/profile/${userInfo.handle}`;
  return (
    <div className="flex justify-center flex-col">
      <a
        className="rounded-lg shadow-md overflow-hidden flex justify-center items-center mt-10 mb-1"
        href={link}
      >
        <img
          src={userInfo.avatar}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
      </a>
      <a
        href={link}
        style={{ color: getRandomColor() }}
        className="mb-10 text-center"
      >
        <span className="font-bold underline">
          {userInfo.firstName} {userInfo.lastName}
        </span>
      </a>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex justify-center items-center">
          <img
            src={userInfo.titlePhoto}
            alt="Title Photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-slate-300 rounded-lg shadow-md p-4 flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-2 text-center">Personal Info</h3>
          <div className="flex flex-col justify-center text-lg">
            <p style={{ color: getRandomColor() }}>
              <span className="font-bold">Name:</span> {userInfo.firstName}{" "}
              {userInfo.lastName}
            </p>
            <p style={{ color: getRandomColor() }}>
              <span className="font-bold">City:</span> {userInfo.city}
            </p>
            <p style={{ color: getRandomColor() }}>
              <span className="font-bold">Country:</span> {userInfo.country}
            </p>
            <p style={{ color: getRandomColor() }}>
              <span className="font-bold">Organization:</span>{" "}
              {userInfo.organization}
            </p>
          </div>
        </div>
        <div className="bg-slate-300 rounded-lg shadow-md p-4 flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-2 text-center">
            Codeforces Info
          </h3>
          <div className="flex flex-col justify-center text-lg">
            <p style={{ color: getRandomColor() }}>
              <span className="font-bold">Handle:</span> {userInfo.handle}
            </p>
            <p style={{ color: getRandomColor() }}>
              <span className="font-bold">Rating:</span> {userInfo.rating}
            </p>
            <p style={{ color: getRandomColor() }}>
              <span className="font-bold">Max Rating:</span>{" "}
              {userInfo.maxRating}
            </p>
            <p style={{ color: getRandomColor() }}>
              <span className="font-bold">Rank:</span> {userInfo.rank}
            </p>
            <p style={{ color: getRandomColor() }}>
              <span className="font-bold">Max Rank:</span> {userInfo.maxRank}
            </p>
            <p style={{ color: getRandomColor() }}>
              <span className="font-bold">Registration Time:</span>{" "}
              {new Date(
                userInfo.registrationTimeSeconds * 1000
              ).toLocaleString()}
            </p>
            <p style={{ color: getRandomColor() }}>
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
