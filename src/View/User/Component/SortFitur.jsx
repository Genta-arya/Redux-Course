import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { selectCharter, setCharter } from "./productlist/fitur/productSlice";

const SortFitur = () => {
  const dispatch = useDispatch();
  const charter = useSelector(selectCharter);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortText, setSortText] = useState("Sort");

  const handleCharterChange = (newCharter, newText) => {
    dispatch(setCharter(newCharter));
    setSortText(newText);
    setDropdownOpen(false);
  };

  return (
    <div className="flex justify-center gap-4 relative mt-4">
      <div className="relative mx-auto w-[90%]">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="cursor-pointer px-2 py-1 border rounded    flex items-center justify-between"
        >
          <div className="text-white">{sortText}</div>
          <FontAwesomeIcon icon={faSort} className="ml-2 text-white" />
        </div>

        {dropdownOpen && (
          <div className="absolute mt-2 w-[100%] lg:w-[100%] md:w-[100%] bg-white border rounded-md shadow-lg z-50">
            <div
              onClick={() => handleCharterChange("high", "A-Z")}
              className="cursor-pointer py-2 px-4 hover:bg-gray-100 text-xs"
            >
              A-Z
            </div>
            <div
              onClick={() => handleCharterChange("low", "Z-A")}
              className="cursor-pointer py-2 px-4 hover:bg-gray-100 text-xs"
            >
              Z-A
            </div>
            <div
              onClick={() => handleCharterChange("lowPrice", "Price (high to low)")}
              className="cursor-pointer py-2 px-4 hover:bg-gray-100 text-xs"
            >
              Price (high to low)
            </div>
            <div
              onClick={() => handleCharterChange("highPrice", "Price (low to high)")}
              className="cursor-pointer py-2 px-4 hover:bg-gray-100 text-xs"
            >
              Price (low to high)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortFitur;
