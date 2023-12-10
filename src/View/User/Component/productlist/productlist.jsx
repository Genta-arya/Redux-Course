import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Skleton from "./skleton";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  addItem,
  selectCartItems,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "./fitur/slice";

import { useDispatch, useSelector } from "react-redux";
import CartModalContent from "../chart";

const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
};

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating.rate);
  const halfStar = rating.rate % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
    );
  }

  if (halfStar) {
    stars.push(
      <FontAwesomeIcon
        key="half"
        icon={faStar}
        className="text-yellow-500 half"
      />
    );
  }

  return (
    <div className="flex">
      {stars}
      <p className="self-center -mt-1 text-gray-500 text-xs">
        ({rating.count})
      </p>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity({ id: itemId }));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };
  return (
    <div className="w-screen">
      {loading ? (
        <div className="mb-2 md:flex sm:flex flex-col justify-end p-12 lg:mr-24"></div>
      ) : (
        <div className="mb-2 md:flex sm:flex flex-col justify-end p-12 lg:mr-24 bg-gray-800  w-screen border-t-2 border-white">
          <label
            htmlFor="categoryFilter"
            className="text-white text-base font-extrabold mr-4 "
          >
            Pilih Kategori:
          </label>
          <select
            id="categoryFilter"
            onChange={(e) => filterProductsByCategory(e.target.value)}
            value={selectedCategory}
            className="bg-white border border-gray-300 rounded p-1 text-xs"
          >
            <option value="all" className="text-md">
              Semua Kategori
            </option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  md:p-3   w-full ">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <Skleton key={index} />)
          : filteredProducts.map((product) => (
              <div className="shadow-2xl bg-white rounded-xl px-12 p-4 h-auto  w-80 lg:w-[90%] md:w-96  text-center mx-auto mb-8 flex flex-col justify-between">
                <div
                  key={product.id}
                  className="overflow-hidden relative mx-auto w-full group:"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 md:w-full md:h-52 border border-gray-500 rounded-3xl lg:w-full lg:h-52 object-scale-down  p-4 mb-4 hover:scale-90 transition-all duration-500 ease-out"
                  ></img>
                  <p className="text-lg font-bold mb-2 lg:hidden md:hidden block">
                    {truncateDescription(product.title, 20)}
                  </p>
                  <p className="text-lg font-bold mb-2 lg:block md:block hidden">
                    {product.title}
                  </p>
                  <div className="flex justify-center p-4 gap-2">
                    {renderStars(product.rating)}
                  </div>
                  <p className="text-gray-600">{`$${product.price}`}</p>
                  <p className="text-gray-500 mb-4 lg:block md:block hidden">
                    {truncateDescription(product.description, 50)}
                  </p>
                </div>
                <button
                  className="bg-black text-white w-full px-4 py-2 rounded hover:bg-gray-800"
                  onClick={() => {
                    dispatch(addItem(product));
                    openCartModal();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="mr-2 text-2xl"
                  />
                </button>
              </div>
            ))}
        {isCartModalOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
            <CartModalContent
              cartItems={cartItems}
              handleClearCart={handleClearCart}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
              closeCartModal={closeCartModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductList;
