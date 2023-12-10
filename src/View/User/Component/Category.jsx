import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  selectProducts,
  setCategory,
} from "./productlist/fitur/productSlice";

const Category = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const selectedCategory = useSelector(selectCategory);

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="grid grid-cols-1 justify-start gap-4 ">
      <label className="text-white ">Pilih Kategori:</label>
      <select
        value={selectedCategory}
        onChange={(e) => {
          dispatch(setCategory(e.target.value));
        }}
        className="ml-2 px-2 py-1 border rounded justify-end w-auto lg:w-80 md:w-80 lg:h-12 md:h-12"
      >
        <option value="" className="l">
          All Categories
        </option>
        {uniqueCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
