import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faMinus,
  faPlus,
  faTimes,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../style/CartModalContent.module.css";
import { removeItem } from "./productlist/fitur/slice";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../service/API";
import { motion, AnimatePresence } from "framer-motion";
import VoucherForm from "./productlist/fitur/VoucherForm";


const CartModalContent = ({
  cartItems,

  handleClearCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  closeCartModal,
}) => {
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const [checkedItems, setCheckedItems] = useState({});
  const [enteredVoucher, setEnteredVoucher] = useState("");
  const [voucherError, setVoucherError] = useState(null);
  const [appliedDiscountPercentage, setAppliedDiscountPercentage] =
    useState(null);

  const handleRemoveWithSlide = (itemId) => {
    setItemToRemove(itemId);
    setTimeout(() => {
      dispatch(removeItem({ id: itemId }));
      setItemToRemove(null);
    }, 400);
  };

  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = {
        ...prevCheckedItems,
        [itemId]: !prevCheckedItems[itemId],
      };
      setIsAnyCheckboxChecked(
        Object.values(updatedCheckedItems).some((value) => value)
      );
      return updatedCheckedItems;
    });
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeCartModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeCartModal]);

  const handleOrder = () => {
    const checkedCartItems = cartItems.filter((item) => checkedItems[item.id]);

    const totalOrderPrice = checkedCartItems.reduce(
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

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength);
    }
    return str;
  };

  const calculateTotalPriceBeforeDiscount = () => {
    const checkedItemsArray = cartItems.filter((item) => checkedItems[item.id]);

    return checkedItemsArray.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
  };

  const calculateTotalPriceAfterDiscount = () => {
    return appliedDiscountPercentage !== null
      ? calculateTotalPriceBeforeDiscount() * (1 - appliedDiscountPercentage)
      : calculateTotalPriceBeforeDiscount();
  };

  const totalCartPrice = calculateTotalPriceBeforeDiscount();

  const formattedTotalCartPrice = totalCartPrice.toFixed(2);

  const handlePay = async () => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString();
    const MAX_ITEM_NAME_LENGTH = 50;

    // Calculate total price before and after discount
    const totalPriceBeforeDiscount = calculateTotalPriceBeforeDiscount();
    const totalPriceAfterDiscount =
      appliedDiscountPercentage !== null
        ? totalPriceBeforeDiscount * (1 - appliedDiscountPercentage / 100)
        : totalPriceBeforeDiscount;

    const orderDetails = {
      items: cartItems.map((item) => ({
        id_product: item.id,
        nm_product: truncateString(item.title, MAX_ITEM_NAME_LENGTH),
        image: item.image,
        qty: item.quantity,
        price: parseFloat(
          appliedDiscountPercentage !== null
            ? totalPriceAfterDiscount.toFixed(2)
            : item.totalPrice.toFixed(2)
        ),
        username: username,
      })),
      email: email,
      time: formattedCurrentDate,
    };
    console.log(orderDetails)

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
     
      navigate("/history");
      window.open(responseData.redirect_url, "_blank");

      if (appliedDiscountPercentage !== null) {
        const updateVoucherResponse = await fetch(
          `${API_ENDPOINTS.update_voucher}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ voucherCode: enteredVoucher, isUsed: true }),
          }
        );

        if (!updateVoucherResponse.ok) {
          throw new Error("Failed to update voucher status");
        }
      }
    } catch (error) {
      console.error("Error sending order:", error);
      navigate("/Error");
    }

    handleClearCart();
    closeCartModal();
  };

  const handleApplyVoucher = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.CekVoucher}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voucherCode: enteredVoucher }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to apply voucher");
      }

      const voucherData = await response.json();
      const discountPercentage = voucherData.discountPercentage;
     
      setAppliedDiscountPercentage(discountPercentage);
      setVoucherError(null);
    } catch (error) {
      console.error("Voucher validation error:", error.message);

      if (error.message) {
        setVoucherError(error.message);
      } else {
        setVoucherError("Failed to apply voucher");
      }

      setAppliedDiscountPercentage(null);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="cart-modal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        ref={modalRef}
        className={`bg-white p-6 rounded-md shadow-lg relative ${styles.cartContainer} h-[500px] overflow-y-auto  w-[90%]`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 left-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={closeCartModal}
        >
          <FontAwesomeIcon icon={faTimes} />
        </motion.button>
        <h2 className="text-xl font-bold mb-4 mt-8">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-600 mt-32">
            <FontAwesomeIcon icon={faShoppingCart} className="text-5xl mb-4" />
            <p className="text-lg">Your cart is currently empty.</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <motion.div
              className={`mb-4 flex items-center justify-between border-b border-gray-300 pb-2 ${
                itemToRemove === item.id ? styles.slideOut : ""
              }`}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={checkedItems[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="mr-2"
                />
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
            </motion.div>
          ))
        )}

        {cartItems.length > 0 && (
          <div>
            <div className="grid grid-cols-1  lg:flex md:flex items-center justify-between mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-red-500 font-semibold hover:text-red-700 focus:outline-none"
                onClick={handleClearCart}
              >
                <FontAwesomeIcon icon={faTrash} /> Remove All
              </motion.button>

              <div className="flex gap-2 justify-center mt-4">
                <button
                  className={`bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 ${
                    !isAnyCheckboxChecked ? " opacity-50" : ""
                  }`}
                  onClick={handleOrder}
                  disabled={!isAnyCheckboxChecked}
                >
                  Chat Admin
                </button>
                <button
                  className={`bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 ${
                    !isAnyCheckboxChecked ? " opacity-50" : ""
                  }`}
                  onClick={handlePay}
                  disabled={!isAnyCheckboxChecked}
                >
                  Pay
                </button>
              </div>
            </div>

            {appliedDiscountPercentage === null ? (
              <div className="text-base font-bold">
                Total: ${calculateTotalPriceBeforeDiscount().toFixed(2)}
              </div>
            ) : (
              <div>
                <div className="text-base font-bold line-through text-gray-500">
                  Original Price: $
                  {calculateTotalPriceBeforeDiscount().toFixed(2)}
                </div>
                <div className="text-base font-bold text-red-500">
                  Discounted Price: $
                  {calculateTotalPriceAfterDiscount().toFixed(2)}
                </div>
              </div>
            )}

            {appliedDiscountPercentage !== null && (
              <div className="text-base font-bold">
                Discount Applied: {appliedDiscountPercentage}%
              </div>
            )}

            <div className="flex  justify-center items-center mt-4">
              <VoucherForm
                enteredVoucher={enteredVoucher}
                setEnteredVoucher={setEnteredVoucher}
                handleApplyVoucher={handleApplyVoucher}
                voucherError={voucherError}
                isCheckboxChecked={isAnyCheckboxChecked}
              />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModalContent;
