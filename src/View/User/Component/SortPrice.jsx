import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSortOrder, setSortOrder } from "./productlist/fitur/productSlice";

const SortPrice = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector(selectSortOrder);

  const handleSortOrderChange = (newSortOrder) => {
    dispatch(setSortOrder(newSortOrder));
  };

  return (
    <div className="grid grid-cols-1 justify-start gap-4  ">
      <label className="text-white  ">Urutkan Harga:</label>
      <select
        value={sortOrder}
        onChange={(e) => handleSortOrderChange(e.target.value)}
        className="border p-2 rounded text-gray-800 focus:outline-none focus:ring focus:border-blue-300 w-auto lg:w-80 md:w-80 lg:h-12 md:h-12"
      >
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
};

export default SortPrice;
