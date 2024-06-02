import React, { useRef, useState, useEffect } from "react";

const SearchBox = () => {
  const searchInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = searchInputRef.current.value.trim();

    if (searchValue === "") {
      setErrorMessage("Please enter a handle.");
      setShowError(true); 
      setTimeout(() => {
        setShowError(false);
      }, 5000); // Hide the error message after 5 seconds
    } else {
      setErrorMessage("");
      // Perform your search operation with searchValue
      console.log("Search value:", searchValue);
    }
  };

  // Clear the error message if the component unmounts
  useEffect(() => {
    return () => {
      setErrorMessage("");
      setShowError(false);
    };
  }, []);

  return (
    <div className="flex justify-center items-center mt-5">
      <form onSubmit={handleSearch} className="w-[90%]">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
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
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search"
            ref={searchInputRef}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
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
      </form>
    </div>
  );
};

export default SearchBox;
