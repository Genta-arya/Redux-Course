import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HeaderGame = () => {
  return (
    <div>
      <div className="bg-gray-800 p-4 text-white flex items-center w-screen overflow-hidden ">
        <Link to="/shop" className="text-white">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 fa-lg" />
        </Link>
        <h1 className="text-2xl font-semibold ml-4">HKKS GAME</h1>
      </div>
    </div>
  );
};

export default HeaderGame;
