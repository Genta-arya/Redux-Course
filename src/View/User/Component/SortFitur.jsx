import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCharter, setCharter } from "./productlist/fitur/productSlice";

const SortFitur = () => {
  const dispatch = useDispatch();
  const charter = useSelector(selectCharter);

  const handleCharterChange = (newCharter) => {
    dispatch(setCharter(newCharter));
  };

  return (
    <div className="grid grid-cols-1 justify-start gap-4 ">
      <label className="text-white ">Sort:</label>
      <select
        value={charter}
        onChange={(e) => handleCharterChange(e.target.value)}
        className="ml-2 px-2 py-1 border rounded justify-end w-auto lg:w-80 md:w-80 lg:h-12 md:h-12"
      >
        <option value="high">A-Z</option>
        <option value="low">Z-A</option>

        <option value="lowPrice">Harga Tertinggi - Terendah</option>
        <option value="highPrice">Harga Terendah - Tertinggi</option>
      </select>
    </div>
  );
};

export default SortFitur;
