import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFavorites, removeFromFavorites } from "./fitur/FavSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const FavoriteModal = ({ onClose }) => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [itemsToRemove, setItemsToRemove] = useState([]);

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

  const handleRemoveWithSlide = (itemId) => {
    setItemsToRemove((prevItems) => [...prevItems, itemId]);
    setTimeout(() => {
      dispatch(removeFromFavorites({ id: itemId }));
      setItemsToRemove((prevItems) =>
        prevItems.filter((item) => item !== itemId)
      );
    }, 100);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg relative w-[90%] max-h-[80vh] overflow-y-auto"
      >
        <button
          className="absolute top-2 left-2 rounded-full p-2 text-gray-500 hover:text-gray-700"
          onClick={handleCloseModal}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Favorite Items</h2>
          <AnimatePresence>
            {favorites.length === 0 ? (
              <p className="text-gray-600">No favorite items yet.</p>
            ) : (
              <motion.ul>
                {favorites.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className={`mb-6`}
                  >
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
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveWithSlide(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FavoriteModal;
