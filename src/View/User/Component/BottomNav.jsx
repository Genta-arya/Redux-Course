import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faHistory,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const BottomNav = ({
  openGame,
  openHistory,
  openCartModal,
  cartItemCount,
  isAuthenticated,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="flex justify-around">
        {isAuthenticated ? (
          <React.Fragment>
            <div className="flex items-center flex-col cursor-pointer">
              <FontAwesomeIcon
                icon={faGamepad}
                className="mb-1 text-2xlr"
                onClick={openGame}
              />
              <span className="text-xs">Game</span>
            </div>
            <div className="flex items-center flex-col cursor-pointer">
              <FontAwesomeIcon
                icon={faHistory}
                className="mb-1 text-2xl "
                onClick={openHistory}
              />
              <span className="text-xs">History</span>
            </div>
            <div className="flex items-center flex-col cursor-pointer">
              <div className="relative " onClick={openCartModal}>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="mb-1 text-2xl"
                />
                {cartItemCount !== 0 && (
                  <span className="text-xs absolute -top-2 -right-2 bg-red-500 text-white font-bold rounded-full px-2">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs">Cart</span>
            </div>
          </React.Fragment>
        ) : (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
            <div className="flex justify-around">
              <div className="flex items-center flex-col cursor-pointer">
                <FontAwesomeIcon
                  icon={faGamepad}
                  className="mb-1 text-2xl "
                  onClick={openGame}
                />
                <span className="text-xs">Game</span>
              </div>

              <div className="flex items-center flex-col opacity-50">
                <FontAwesomeIcon icon={faHistory} className="mb-1 text-2xl " />
                <span className="text-xs">History</span>
              </div>

              <div className="flex items-center flex-col opacity-50">
                <div className="relative ">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="mb-1 text-2xl"
                  />

                  {cartItemCount !== 0 && (
                    <span className="text-xs absolute -top-2 -right-2 bg-red-500 text-white font-bold rounded-full px-2">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="text-xs">Cart</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
