import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faGamepad,
  faHistory,
  faH,
} from "@fortawesome/free-solid-svg-icons";
import {
  selectCartItems,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "./productlist/fitur/slice";
import CartModalContent from "./chart";
import SearchInput from "./Search";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import {
  selectIsAuthenticated,
  setAuthenticated,
} from "./productlist/fitur/AuthSlice";
import { verifJWT } from "../../../service/API";
import "../../../style/custome.css";
import VoucherModal from "./productlist/VocuherModal";
import FavoriteModal from "./productlist/FavoriteModal";
const Navbar = () => {
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isVoucherModalOpen, setVoucherModalOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItemCount = cartItems.length;
  const [isFavoriteModalOpen, setFavoriteModalOpen] = useState(false);

  const openCartModal = () => {
    setCartModalOpen(true);
  };
  const handleClickOpenFavoriteModal = () => {
    setFavoriteModalOpen(true);
  };

  const openGame = () => {
    navigate("/game");
  };
  const openHistory = () => {
    navigate("/history");
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
    const fetchData = async () => {
      try {
        const data = await verifJWT();

        if (data.isLogin) {
          dispatch(setAuthenticated(true));
          setDropdownOpen(false);
        } else {
          dispatch(setAuthenticated(false));
        }
      } catch (error) {}
    };

    fetchData();
  }, [dispatch, navigate]);

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

  const handleClick = () => {
    navigate("/");
  };

  const handleVoucherClick = () => {
    setDropdownOpen(false);

    setVoucherModalOpen(true);
  };

  const handleCloseVoucherModal = () => {
    setVoucherModalOpen(false);
  };

  const handleCloseFavorite = () => {
    setFavoriteModalOpen(false);
  };
  return (
    <div className="bg-gray-800 p-4 w-screen ">
      <div className="flex justify-between items-center px-2 lg:px-32 md:px-12">
        <div>
          <div
            className="text-white text-lg font-bold lg:block shines cursor-pointer"
            onClick={handleClick}
          >
            HKKS STORE
          </div>
        </div>

        <div className="hidden lg:flex md:hidden items-center">
          <SearchInput />
        </div>
        <div className="flex gap-12">
          {isAuthenticated ? (
            <div className=" items-center md:hidden lg:block mt-2 hidden ">
              <div className="text-white flex items-center ml-4  ">
                <FontAwesomeIcon
                  icon={faGamepad}
                  className="mr-12 text-2xl cursor-pointer"
                  onClick={openGame}
                />
                <FontAwesomeIcon
                  icon={faHistory}
                  className="mr-12 text-2xl cursor-pointer"
                  onClick={openHistory}
                />

                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="mr-2 text-2xl cursor-pointer"
                  onClick={openCartModal}
                />
                {cartItemCount !== 0 && (
                  <div className="bg-red-500 text-white font-bold rounded-full px-2">
                    {cartItemCount}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-2 md:hidden lg:block hidden ">
              <div className="text-white flex items-center ml-4  ">
                <FontAwesomeIcon
                  icon={faGamepad}
                  className="mr-12 text-2xl cursor-pointer "
                  onClick={openGame}
                />
                <FontAwesomeIcon
                  icon={faHistory}
                  className="mr-12 text-2xl  opacity-50 "
                />
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="mr-2 text-2xl opacity-50 "
                />
                {cartItemCount !== 0 && (
                  <div className="bg-red-500 text-white font-bold rounded-full px-2 opacity-50 ">
                    {cartItemCount}
                  </div>
                )}
              </div>
            </div>
          )}
          {isAuthenticated ? (
            <div className="flex items-center">
              <div
                className="avatar online md:block lg:block"
                onClick={handleClickAvatar}
              >
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="Avatar"
                    className="lg:w-full lg:h-full md:w-full md:h-full object-cover cursor-pointer"
                  />
                </div>
                {isDropdownOpen && (
                  <div className="absolute bg-white rounded-2xl z-50 lg:top-12 lg:right-4 md:top-12 md:right-4 top-5 right-12 h-40 w-40 border-gray-500 border-4 p-2 overflow-x-auto">
                    <ul>
                      <li
                        className="mb-2 text-center hover:bg-gray-100 cursor-pointer border-gray-400"
                        onClick={handleVoucherClick}
                      >
                        <a className="block py-2">Voucher</a>
                      </li>
                      <li
                        className="mb-2 text-center hover:bg-gray-100 cursor-pointer border-gray-400"
                        onClick={handleClickOpenFavoriteModal}
                      >
                        <a className="block py-2">Favorite</a>
                      </li>
                      <li className="mb-1 text-center border-gray-400 border-b-2"></li>
                      <li
                        className="text-center hover:bg-gray-100 cursor-pointer border-gray-400"
                        onClick={handleLogout}
                      >
                        <a className="block py-2">Logout</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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
        <div className="  text-white text-center py-2 mt-12 lg:hidden md:block block">
          <div className="flex text-black justify-center">
            <SearchInput />
          </div>
          <div className="text-white flex items-center justify-end ml-4 gap-2 ">
            <BottomNav
              openGame={openGame}
              openHistory={openHistory}
              openCartModal={openCartModal}
              cartItemCount={cartItemCount}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
      )}

      {isVoucherModalOpen && <VoucherModal onClose={handleCloseVoucherModal} />}
      {isFavoriteModalOpen && <FavoriteModal onClose={handleCloseFavorite} />}
    </div>
  );
};

export default Navbar;
