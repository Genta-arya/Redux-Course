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
      <label className="text-white ">Urutkan:</label>
      <select
        value={charter}
        onChange={(e) => handleCharterChange(e.target.value)}
        className="ml-2 px-2 py-1 border rounded justify-end w-auto lg:w-80 md:w-80 lg:h-12 md:h-12"
      >
        <option value="low">A-Z</option>
        <option value="high">Z-A</option>
        <option value="lowPrice">Harga Terendah - Tertinggi</option>
        <option value="highPrice">Harga Tertinggi - Terendah</option>
      </select>
    </div>
  );
};

export default SortFitur;
