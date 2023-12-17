import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import bg from "../../../../assets/notsearch.png"
import {
  addItem,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  selectCartItems,
} from "./fitur/slice";

import {
  selectCategory,
  selectProducts,
  setProducts,
  selectSortOrder,
  selectCharter,
  selectSearchTerm,
  sortByCharacter,
} from "./fitur/productSlice";

import CartModalContent from "../chart";
import CategoryFilter from "../Category";
import Skeleton from "./skleton";
import Rating from "../Rating";
import SortFitur from "../SortFitur";
import {
  selectIsAuthenticated,
  selectVoucherData,
  setAuthenticated,
} from "./fitur/AuthSlice";
import { verifJWT } from "../../../../service/API";
import { motion } from "framer-motion";
import ImageModal from "./fitur/ImageModal";
import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from "./fitur/FavSlice";
import { ToastContainer, toast } from "react-toastify";
import VoucherModal from "./VocuherModal";
import useAuthCheck from "../../../../service/AuthHook";

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
  const cartItems = useSelector(selectCartItems);
  const favorites = useSelector(selectFavorites);
  const charter = useSelector(selectCharter);
  const searchTerm = useSelector(selectSearchTerm);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const voucherData = useSelector(selectVoucherData);
  const [isVoucherModalOpen, setVoucherModalOpen] = useState(false);

  useAuthCheck();
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
    if (voucherData && voucherData[0].is_used === 0) {
      setVoucherModalOpen(true);
    } else {
      setVoucherModalOpen(false);
    }
  }, [voucherData]);

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await verifJWT();

        if (data.isLogin) {
          dispatch(setAuthenticated(true));
        } else {
          dispatch(setAuthenticated(false));
        }
      } catch (error) {}
    };

    fetchData();
  }, [dispatch, navigate]);

  const openCartModal = () => setCartModalOpen(true);
  const closeCartModal = () => setCartModalOpen(false);
  const openImageModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setImageModalOpen(true);
  };

  const handleClearCart = () => dispatch(clearCart());
  const handleDecreaseQuantity = (itemId) =>
    dispatch(decreaseQuantity({ id: itemId }));
  const handleIncreaseQuantity = (itemId) => dispatch(increaseQuantity(itemId));

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        (selectedCategory === "" || product.category === selectedCategory) &&
        (searchTerm === "" ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => sortByCharacter([a, b], charter));

  const handleAddToFavorites = (product) => {
    if (favorites.some((item) => item.id === product.id)) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
    }

    const maxTitleLength = 50;
    const truncatedTitle =
      product.title.length > maxTitleLength
        ? `${product.title.slice(0, maxTitleLength)}......`
        : product.title;
    const remainingTitle =
      product.title.length > maxTitleLength
        ? `(${product.title.length - maxTitleLength}`
        : "";
    const notificationMessage = `${truncatedTitle} ${
      favorites.some((item) => item.id === product.id)
        ? "removed from"
        : "added to"
    } favorites!`;

    toast.success(notificationMessage, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="w-screen">
      {!loading && (
        <div className="bg-gray-800 p-4">
          <div className="lg:flex md:flex justify-around grid grid-flow-col-1">
            <CategoryFilter />
          </div>
          <SortFitur />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:p-3 gap-2 p-2">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} />)
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="flex w-screen items-center justify-center p-4 ">
            <div className="text-white text-center rounded-lg ">
              <img
                src={bg} 
                alt="No Products Found"
                className="mb-4 rounded-lg "
              />
              <p className="text-lg">We couldn't find any products.</p>
              <p className="text-lg mt-4">Please check back later.</p>
            </div>
          </div>
        ) : (
          filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="shadow-2xl drop-shadow-2xl bg-white rounded-lg flex flex-col justify-between gap-2 text-center mt-4 w-auto  px-2  py-8 lg:w-[95%]"
            >
              <div className="overflow-hidden relative mx-auto w-full group">
                <img
                  src={product.image}
                  alt={product.title}
                  onClick={() => openImageModal(product.image)}
                  className=" cursor-pointer w-full h-40 md:w-full md:h-52  lg:w-full lg:h-52 object-scale-down p-4 mb-4 hover:scale-90 transition-all duration-500 ease-out"
                />
                {isAuthenticated && (
                  <button
                    className={`bg-transparent w-full px-4 py-2 mt-2 rounded transition-all duration-500 ease-out`}
                    onClick={() => handleAddToFavorites(product)}
                  >
                    {favorites.some((item) => item.id === product.id) ? (
                      <FontAwesomeIcon
                        icon={solidHeart}
                        className="text-red-500"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={outlineHeart}
                        className="text-gray-500"
                      />
                    )}
                    <span className="ml-2">
                      {favorites.some((item) => item.id === product.id)}
                    </span>
                  </button>
                )}

                <p className="text-lg font-bold mb-2 lg:hidden md:hidden block">
                  {truncateDescription(product.title, 30)}
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
                className={`bg-black text-white w-full px-4 py-2  mt-4 rounded  hover:scale-105 transition-all duration-500 ease-out ${
                  isAuthenticated ? "hover:bg-gray-800" : "bg-gray-300 "
                }`}
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (token) {
                    dispatch(addItem(product));
                    openCartModal();
                  }
                }}
                disabled={!isAuthenticated}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="mr-2 lg:text-2xl md:text-2xl text-md "
                />
              </button>
            </motion.div>
          ))
        )}
      </div>

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

      {isVoucherModalOpen && (
        <VoucherModal onClose={() => setVoucherModalOpen(false)} />
      )}
      {isImageModalOpen && (
        <ImageModal
          imageUrl={selectedImageUrl}
          onClose={() => setImageModalOpen(false)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductList;
