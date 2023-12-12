import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Content from "../Component/Content";
import Footer from "../Component/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import FooterDaisy from "../Component/FooterDaisy";
import useAuthCheck from "../../../service/AuthHook";

const HomePage = () => {
  const [showScroll, setShowScroll] = useState(false);
  const navigate = useNavigate();
  useAuthCheck();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  return (
    <div className="mx-auto">
      <div className="">
        <Navbar />
      </div>
      <div className="mb-12">
        <Content />
      </div>
      <FooterDaisy />
      <Footer />
      {showScroll && (
        <div
          className="fixed bottom-20 right-5 md:bottom-24 md:right-5 lg:bottom-40 lg:right-10 bg-gray-700 lg:p-5 md:p-5 p-3 rounded-full cursor-pointer"
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-white text-sm" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
