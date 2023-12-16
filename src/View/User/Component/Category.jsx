import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  selectCategory,
  selectProducts,
  setCategory,
} from "./productlist/fitur/productSlice";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Category = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const selectedCategory = useSelector(selectCategory);

  const uniqueCategories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );
  const [bgColors, setBgColors] = useState([]);

  useEffect(() => {
    const fetchColors = () => {
      const colors = uniqueCategories.map(() => {
        const randomColor = getRandomColor();
        return randomColor;
      });
      setBgColors(colors);
    };

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    fetchColors();
  }, [uniqueCategories]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: window.innerWidth >= 1000,
    autoplay: window.innerWidth >= 1000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false,
          autoplay: window.innerWidth >= 1000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          autoplay: window.innerWidth >= 1000,
        },
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 justify-start gap-4 lg:border-white lg:border-t-2 md:border-white md:border-t-2 lg:px-40 md:p-2 ">
      <div className="flex justify-between">
        <label className="text-white  font-semibold text-base lg:text-xl md:text-xl mb-2 px-4 mt-4 lg:px-20 md:px-11">
          Categories
        </label>

        <div className="lg:px-24 md:px-24 px-4 mt-4 mb-2 ">
          <button
            className={` text-sm  w-fit category-item text-white bg-gray-700 p-2 rounded-lg transition duration-300 ease-in-out hover:bg-gray-600 ${
              selectedCategory === "" ? "border-b-2 border-white" : ""
            }`}
            onClick={() => dispatch(setCategory(""))}
          >
            All Categories
          </button>
        </div>
      </div>

      <div className="mx-auto w-[90%]">
        <Slider {...sliderSettings} className="w-full">
          {uniqueCategories.map((category, index) => (
            <div key={category} className="card">
              <button
                className={`category-item w-[90%] lg:w-[90%] md:w-[95%] lg:h-28 md:h-20 h-16 rounded-xl font-serif font-bold relative text-xl ${
                  selectedCategory === category
                    ? "text-white transform transition-all duration-300 rounded-lg text-xs lg:text-xl"
                    : "rainbow-bg text-white transform scale-100 transition-all duration-300 hover:transform hover:scale-90 hover:transition-all hover:duration-300 rounded-lg text-xs lg:text-base"
                } transition duration-300 ease-in-out rounded-lg `}
                style={{
                  backgroundColor:
                    selectedCategory === category
                      ? "bg-blue-500"
                      : bgColors[index],
                }}
                onClick={() => dispatch(setCategory(category))}
              >
                {category}
                {selectedCategory === category && (
                  <div className="absolute lg:bottom-3 md:bottom-3 bottom-1 left-1/4 right-1/4 h-1 bg-white rounded-full"></div>
                )}
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Category;
