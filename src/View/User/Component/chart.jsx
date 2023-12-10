import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faMinus,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../style/CartModalContent.module.css";
import { removeItem } from "./productlist/fitur/slice";

const CartModalContent = ({
  cartItems,
  handleClearCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  closeCartModal,
}) => {
  const [itemToRemove, setItemToRemove] = useState(null);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const handleRemoveWithSlide = (itemId) => {
    setItemToRemove(itemId);
    setTimeout(() => {
      dispatch(removeItem({ id: itemId }));
      setItemToRemove(null);
    }, 400);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeCartModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeCartModal]);

  return (
    <div
      ref={modalRef}
      className={`bg-white p-6 rounded-md shadow-lg relative ${styles.cartContainer}`}
    >
      <button
        className="absolute top-2 left-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={closeCartModal}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className="text-xl font-bold mb-4 mt-8">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">No items in the cart</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className={`mb-4 flex items-center justify-between border-b border-gray-300 pb-2 ${
              itemToRemove === item.id ? styles.slideOut : ""
            }`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div>
                <p className="text-lg font-bold">{item.title}</p>
                <p className="text-lg font-bold">${item.totalPrice}</p>
                <p className="text-xs font-bold mt-2">Qty</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    disabled={item.quantity === 1}
                    className={`text-blue-500 font-semibold hover:text-blue-700 focus:outline-none ${
                      item.quantity === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="text-green-500 font-semibold hover:text-green-700 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleRemoveWithSlide(item.id)}
              className="text-red-500 font-semibold hover:text-red-700 focus:outline-none mt-4"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <button
            className="text-red-500 font-semibold hover:text-red-700 focus:outline-none"
            onClick={handleClearCart}
          >
            <FontAwesomeIcon icon={faTrash} /> Remove All
          </button>
        </div>
      )}
    </div>
  );
};

export default CartModalContent;
