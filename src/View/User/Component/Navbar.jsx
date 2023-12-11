import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars , faGamepad } from "@fortawesome/free-solid-svg-icons";
import {
  selectCartItems,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "./productlist/fitur/slice";
import CartModalContent from "./chart";
import SearchInput from "./Search";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartItemCount = cartItems.length;

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const openGame = () => {
    navigate("/game")
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);

    window.removeEventListener("click", closeMobileMenu);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setDropdownOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.reload();
  };
  const handleClickAvatar = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-gray-800 p-4 w-screen">
      <div className="flex justify-between items-center px-2 lg:px-32 md:px-12">
        <div className="text-white text-lg font-bold lg:block md:block hidden">
          IKKEA SHOP
        </div>
        <div className="lg:hidden md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="text-white text-2xl cursor-pointer"
            onClick={toggleMobileMenu}
          />
        </div>
        <div className="hidden lg:flex md:flex items-center">
          <SearchInput />
        </div>
        <div className="flex gap-12">
          {localStorage.getItem("token") ? (
            <div className=" items-center md:block lg:block mt-2 hidden">
              <div className="text-white flex items-center ml-4  ">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="mr-2 text-2xl cursor-pointer"
                  onClick={openCartModal}
                />
                <div className="bg-red-500 text-white font-bold rounded-full px-2">
                  {cartItemCount}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-2 md:block lg:block hidden">
              <div className="text-white flex items-center ml-4 opacity-50 ">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="mr-2 text-2xl "
                />
                <div className="bg-red-500 text-white font-bold rounded-full px-2">
                  {cartItemCount}
                </div>
              </div>
            </div>
          )}

          {localStorage.getItem("token") ? (
            <div
              className="avatar online md:block lg:block "
              onClick={handleClickAvatar}
            >
              <div className="w-10 rounded-full overflow-hidden  ">
                <img
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="Avatar"
                  className="lg:w-full lg:h-full md:w-full md:h-full   object-cover cursor-pointer "
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute lg:top-12 lg:right-4 md:top-12 md:right-4 top-5 right-12 h-auto">
                  <ul className="bg-white  p-2 rounded-md shadow-md">
                    <li
                      className="text-center justify-center items-center flex cursor-pointer"
                      onClick={handleLogout}
                    >
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <h1
              className="text-white text-lg font-bold cursor-pointer mt-1"
              onClick={handleLogin}
            >
              Login
            </h1>
          )}
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

      {isMobileMenuOpen && (
        <div className="text-white text-center py-2 mt-12">
          <div className="flex text-black justify-between">
            <SearchInput />
            <div className="text-white flex items-center justify-end ml-4 gap-2 ">
              {localStorage.getItem("token") ? (
                <React.Fragment>
                  <FontAwesomeIcon
                    icon={faGamepad}
                    className="mr-2 text-2xl cursor-pointer"
                    onClick={openGame}
                  />
                 
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="mr-2 text-2xl cursor-pointer"
                    onClick={openCartModal}
                  />
                  <div className="bg-red-500 text-white font-bold rounded-full px-2">
                    {cartItemCount}
                  </div>
                </React.Fragment>
              ) : (
                <div className="mt-2">
                  <div className="text-white flex items-center ml-4 opacity-50 ">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="mr-2 text-2xl "
                    />
                    <div className="bg-red-500 text-white font-bold rounded-full px-2">
                      {cartItemCount}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
