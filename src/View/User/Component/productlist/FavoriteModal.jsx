import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFavorites, removeFromFavorites } from "./fitur/FavSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { addItem, selectCartItems } from "./fitur/slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CartModalContent from "../chart";

const FavoriteModal = ({ onClose }) => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState(null);
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleCloseModal = () => {
    onClose();
  };

  const handleRemoveFromFavorites = (itemId) => {
    dispatch(removeFromFavorites({ id: itemId }));
  };
  const handleAddToCart = (item) => {
    const maxTitleLength = 50;
    const truncatedTitle =
      item.title.length > maxTitleLength
        ? `${item.title.slice(0, maxTitleLength)}......`
        : item.title;
    const remainingTitle =
      item.title.length > maxTitleLength
        ? `(${item.title.length - maxTitleLength} characters remaining)`
        : "";
    const notificationMessage = `${truncatedTitle}  Succes added to cart! `;

    dispatch(addItem(item));
    toast.success(notificationMessage, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleOpenCartModal = (item) => {
    setSelectedCartItem(item);
    setCartModalOpen(true);
    handleAddToCart(item);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-8 rounded-lg relative w-[90%]">
        <button
          className="absolute top-2 left-2 rounded-full p-2 text-gray-500 hover:text-gray-700"
          onClick={handleCloseModal}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Favorite Items</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-600">No favorite items yet.</p>
          ) : (
            <ul>
              {favorites.map((item) => (
                <li key={item.id} className="mb-6">
                  <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="text-lg font-semibold">{item.title}</p>
                        <p className="text-gray-600">{`$${item.price}`}</p>
                      </div>
                    </div>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleOpenCartModal(item)}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                  </div>
                  <div className="flex items-center mt-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveFromFavorites(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FavoriteModal;
