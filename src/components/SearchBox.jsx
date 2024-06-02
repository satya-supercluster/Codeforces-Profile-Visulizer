import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import code from '/code.svg'
const SearchBox = ({ setUserInfo }) => {
  const searchInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [loader, setLoader] = useState(false);
    const handleSearch = async (e) => {
        e.preventDefault();
        const searchValue = searchInputRef.current.value.trim();
        
        if (searchValue === "") {
            setErrorMessage("Please enter a handle.");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
        } else {
        setLoader(true);
        setErrorMessage("");
        console.log(
          `${import.meta.env.VITE_CF_URL}user.info?handles=${searchValue}`
        );
      try {
        const response = await fetch(
          `${import.meta.env.VITE_CF_URL}user.info?handles=${searchValue}`
        );
        const data = await response.json();
          setLoader(false);
        if (data.status === "OK") {
          setUserInfo(data.result[0]);
          console.log("User info:", data.result);
        } else if (data.status === "FAILED") {
          setErrorMessage(data.comment);
          setUserInfo(null);
          setShowError(true);
          setTimeout(() => {
              setShowError(false);
          }, 5000);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  // Clear the error message and user info if the component unmounts
  useEffect(() => {
    return () => {
      setErrorMessage("");
      setShowError(false);
      setUserInfo(null);
    };
  }, [searchInputRef]);

  return (
    <motion.div
      className="flex justify-center items-center mt-5"
      whileTap={{ scale: 0.98 }}
    >
      <form onSubmit={handleSearch} className="w-[90%] lg:max-w-[50%]">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-yellow-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 font-semibold text-blue-900 border-2 border-black rounded-lg bg-gray-50 "
            placeholder="Search"
            ref={searchInputRef}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-3 sm:px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        {showError && (
          <div className="flex mt-2">
            <h1 className="text-lg p-2 bg-black text-red-600 font-bold rounded-xl">
              {errorMessage}
            </h1>
          </div>
        )}
        {loader && (
          <div className="flex flex-col justify-center items-center mt-5">
            <img
              src={code}
              alt="Avatar"
              className="w-20 mb-5 h-20 rounded-full object-cover"
            />
            <div className="text-orange-700 font-bold text-2xl ">Loading...</div>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default SearchBox;
