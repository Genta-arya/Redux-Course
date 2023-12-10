import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchTerm,
  setSearchTerm,
} from "./productlist/fitur/productSlice";

const SearchInput = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchTerm(inputValue));
    }
  };

  return (
    <div className="flex items-center rounded-md overflow-hidden bg-white shadow-md">
      <span className="px-3">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
      </span>
      <input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        className="border-none focus:outline-none py-2 px-4 w-40 sm:w-64"
      />
    </div>
  );
};

export default SearchInput;
