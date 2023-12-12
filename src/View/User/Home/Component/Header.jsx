import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from "../../../../assets/hkks.png";

const Header = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const fadeInUp = {
    hidden: { opacity: 0.6, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  if (inView) {
    controls.start("visible");
  }

  const handleExploreClick = () => {
    const landingpage = document.getElementById("landingpage");
    if (landingpage) {
      landingpage.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className="relative bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900 min-h-screen "
    >
      <div className="absolute inset-0 w-screen ">
        <img
          src="https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg"
          alt="Header Background"
          className="object-cover w-full h-full  "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 opacity-80"></div>
      </div>
      <div className="container mx-auto text-center relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 p-2 font-serif">
          "Discover Your Essential Items"
        </h1>
        <p className="text-lg md:text-xl text-white mb-2 font-serif">
          Explore High-Quality Products
        </p>
        <p className="text-lg md:text-lg text-white mb-8 font-serif">
          Become Your Trusted Source of Information
        </p>
        <button
          onClick={handleExploreClick}
          className=" text-white font-bold font-serif py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-110 border-b-8 border "
        >
          Explore Now
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
