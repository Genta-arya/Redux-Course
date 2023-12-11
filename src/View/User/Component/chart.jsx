import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faMinus,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import styles from "../../../style/CartModalContent.module.css";
import { removeItem } from "./productlist/fitur/slice";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../service/API";

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
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

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

  const handleOrder = () => {
    const totalOrderPrice = cartItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    const formattedTotalOrderPrice = totalOrderPrice.toFixed(2);

    const orderDetails = cartItems
      .map((item, index) => {
        const itemNumber = index + 1;
        return `${itemNumber}. ${item.title} - Qty: ${item.quantity} - Total: $${item.totalPrice}\nImage: ${item.image}`;
      })
      .join("\n");

    const phoneNumber = "6281285241889";

    const whatsappMessage = `Hi, I would like to place an order.\n\n${orderDetails}\nTotal Order Price: $${formattedTotalOrderPrice}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength);
    }
    return str;
  };
  const totalCartPrice = calculateTotalPrice();
  const formattedTotalCartPrice = totalCartPrice.toFixed(2);
  const MAX_ITEM_NAME_LENGTH = 50;

  const handlePay = async () => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString();

    const orderDetails = {
      items: cartItems.map((item) => ({
        id_product: item.id,
        nm_product: truncateString(item.title, MAX_ITEM_NAME_LENGTH),
        image: item.image,
        qty: item.quantity,
        price: formattedTotalCartPrice,
        username: username,
      })),
      email: "example@example.com",

      time: formattedCurrentDate,
    };

    try {
      const response = await fetch(`${API_ENDPOINTS.ORDER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to send order");
      }

      const responseData = await response.json();

      const redirectUrl = responseData.redirectUrl;

      if (redirectUrl) {
        window.open(redirectUrl, "_blank");
      } else {
        console.log("Order sent successfully");
      }
      navigate("/history");
    } catch (error) {
      console.error("Error sending order:", error);
      navigate("/Error");
    }

    handleClearCart();
    closeCartModal();
  };
  return (
    <div
      ref={modalRef}
      className={`bg-white p-6 rounded-md shadow-lg relative ${styles.cartContainer} h-[500px] overflow-y-auto `}
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
        <div className="grid grid-cols-1  lg:flex md:flex items-center justify-between mt-4">
          <button
            className="text-red-500 font-semibold hover:text-red-700 focus:outline-none"
            onClick={handleClearCart}
          >
            <FontAwesomeIcon icon={faTrash} /> Remove All
          </button>
          <div className="text-base font-bold">
            Total : ${formattedTotalCartPrice}
          </div>
          <div className="flex gap-2 justify-center mt-4">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={handleOrder}
            >
              Chat Admin
            </button>

            <button
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={handlePay}
            >
              Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModalContent;
