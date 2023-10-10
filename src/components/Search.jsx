import React from "react";
import { useState } from "react";
import {
    faCaretDown
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div>
      <div className="relative text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="absolute right-0 bottom-0.5 rounded-br-lg rounded-tr-lg mt-3 mr-1.5 bg-gray-100 w-10 h-[36px]"
        >
        <FontAwesomeIcon className="text-gray-400" icon={faCaretDown}/>
        </button>

      </div>
    </div>
  );
};

export default Search;
