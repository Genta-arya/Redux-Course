import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "./productlist/fitur/productSlice";

const SearchInput = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearClick = () => {
    setInputValue("");
    dispatch(setSearchTerm(""));
  };

  return (
    <div className="flex items-center rounded-xl overflow-hidden bg-white shadow-md w-full sm:w-[80%] md:w-[60%] lg:w-full mx-auto">
      <span className="px-3">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
      </span>
      <input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleSearchChange}
        className="border-none focus:outline-none py-2 px-4 w-full"
      />
      {inputValue && (
        <span className="px-3 cursor-pointer sm:hidden" onClick={handleClearClick}>
          <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
        </span>
      )}
      {inputValue && (
        <span className="px-3 cursor-pointer hidden sm:inline" onClick={handleClearClick}>
          <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
        </span>
      )}
    </div>
  );
};

export default SearchInput;
