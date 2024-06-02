import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import UserInfo from "./components/UserInfo";
import RatingGraph from "./components/RatingGraph";
import TagChart from "./components/TagChart";
export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [userProblems, setUserProblems] = useState(null);
  const [userRatings, setUserRatings] = useState(null);
  return (
    <>
      <div className="py-5 px-3 sm:px-5 bg-gray-400 min-h-screen gap-5">
        <Navbar />
        <SearchBox
          setUserInfo={setUserInfo}
          setUserProblems={setUserProblems}
          setUserRatings={setUserRatings}
        />
        {userInfo && userProblems && userRatings && (
          <div className="flex justify-center">
            <UserInfo userInfo={userInfo} />
          </div>
        )}
        {userInfo && userProblems && userRatings && (
          <TagChart userProblems={userProblems} />
        )}
        {userInfo && userProblems && userRatings && (
          <RatingGraph
            userRatings={userRatings}
            name={`${userInfo.firstName} ${userInfo.lastName}`}
          />
        )}
      </div>
    </>
  );
}
