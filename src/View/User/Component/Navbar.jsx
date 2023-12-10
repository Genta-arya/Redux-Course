// Navbar.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  selectCartItems,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "./productlist/fitur/slice"; 

import CartModalContent from "./chart";

const Navbar = () => {
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartItemCount = cartItems.length;

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
    <div className="bg-gray-800 p-4 w-screen">
      <div className="flex justify-between items-center px-2 lg:px-32 md:px-32">
        <div className="text-white text-lg font-bold">IKKEA SHOP</div>

        <div className="text-white flex items-center">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="mr-2 text-2xl cursor-pointer"
            onClick={openCartModal}
          />

          <div className="bg-red-500 text-white font-bold rounded-full px-2">
            {cartItemCount}
          </div>
        </div>

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

export default Navbar;
