import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSortOrder,
  setSortOrder,
} from "./productlist/fitur/productSlice";

const SortByCharter = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector(selectSortOrder);

  const handleSortChange = (newSortOrder) => {
    dispatch(setSortOrder(newSortOrder));
  };

  return (
    <div className="grid grid-cols-1 justify-start gap-4 ">
      <label className="text-white">Urutkan Karakter:</label>
      <select
        value={sortOrder}
        onChange={(e) => handleSortChange(e.target.value)}
        className="ml-2 px-2 py-1 border rounded justify-end w-auto lg:w-80 md:w-80 lg:h-12 md:h-12"
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
};

export default SortByCharter;
