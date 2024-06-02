import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import UserInfo from "./components/UserInfo";
export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <>
      <div className="py-5 px-3 sm:px-5 bg-gray-400 min-h-screen gap-5">
        <Navbar />
        <SearchBox setUserInfo={setUserInfo} />
        {userInfo && (
          <div className="flex justify-center">
            <UserInfo userInfo={userInfo} />
          </div>
        )}
      </div>
    </>
  );
}
