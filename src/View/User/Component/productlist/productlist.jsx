import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  addItem,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  selectCartItems,
} from "./fitur/slice";

import { useDispatch, useSelector } from "react-redux";
import CartModalContent from "../chart";
import {
  selectCategory,
  selectProducts,
  setProducts,
  selectSortOrder,
  selectCharter,
  selectSearchTerm,
  sortByPrice,
  sortByCharacter,
} from "./fitur/productSlice";
import CategoryFilter from "../Category";
import Skeleton from "./skleton";

import Rating from "../Rating";

import { useNavigate } from "react-router-dom";
import SortFitur from "../SortFitur";

const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
};

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const selectedCategory = useSelector(selectCategory);
  const selectedCategoryFilter = useSelector(selectCategory);
  const cartItems = useSelector(selectCartItems);
  const sortOrder = useSelector(selectSortOrder);
  const charter = useSelector(selectCharter);
  const [loading, setLoading] = React.useState(true);
  const [isError, setIsError] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      dispatch(setProducts(response.data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

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

  const searchTerm = useSelector(selectSearchTerm);
  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        (selectedCategory === "" || product.category === selectedCategory) &&
        (searchTerm === "" ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => sortByCharacter([a, b], charter));
  return (
    <div className="w-screen">
      {loading ? (
        <div className="mb-2  justify-end p-12 lg:mr-24"></div>
      ) : (
        <div className="lg:flex  items-center grid grid-cols-1 gap-4 p-4  bg-gray-800 w-screen border-t-2 border-white">
          <CategoryFilter />
          <SortFitur />
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  md:p-3   w-full ">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} />)
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="flex mx-auto items-center justify-center">
            <div className="text-white text-center  ">Products not found.</div>
          </div>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <div
              className="shadow-2xl bg-white rounded-xl px-12 p-4 h-auto  w-80 lg:w-[90%] md:w-96  text-center mx-auto mb-8 flex flex-col justify-between"
              key={product.id}
            >
              <div className="overflow-hidden relative mx-auto w-full group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 md:w-full md:h-52 border border-gray-500 rounded-3xl lg:w-full lg:h-52 object-scale-down  p-4 mb-4 hover:scale-90 transition-all duration-500 ease-out"
                />
                <p className="text-lg font-bold mb-2 lg:hidden md:hidden block">
                  {truncateDescription(product.title, 20)}
                </p>
                <p className="text-lg font-bold mb-2 lg:block md:block hidden">
                  {product.title}
                </p>
                <div className="flex justify-center p-4 gap-2">
                  <Rating productId={product.id}></Rating>
                </div>
                <p className="text-gray-600">{`$${product.price}`}</p>
                <p className="text-gray-500 mb-4 lg:block md:block hidden">
                  {truncateDescription(product.description, 50)}
                </p>
              </div>
              <button
                className={`bg-black text-white w-full px-4 py-2 rounded ${
                  localStorage.getItem("token")
                    ? "hover:bg-gray-800"
                    : "bg-gray-300 "
                }`}
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (token) {
                    dispatch(addItem(product));
                    openCartModal();
                  }
                }}
                disabled={!localStorage.getItem("token")}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="mr-2 text-2xl"
                />
              </button>
            </div>
          ))
        )}
        {isCartModalOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
            <CartModalContent
              handleClearCart={handleClearCart}
              cartItems={cartItems}
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
