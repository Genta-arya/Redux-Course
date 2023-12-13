import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const ImageModal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleCloseModal = (event) => {
    if (!event.target.closest(".modal-content")) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 flex items-center justify-center z-50"
        onClick={handleCloseModal}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.7 }} 
          className="bg-white p-12 rounded-md shadow-lg relative w-[90%] md:w-[70%] lg:w-[50%] flex items-center justify-center modal-content"
        >
          <motion.img
            src={imageUrl}
            alt="Full Image"
            className="w-fit h-40 lg:h-96 md:h-80"
          />
          <button
            className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 focus:outline-none text-2xl"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
