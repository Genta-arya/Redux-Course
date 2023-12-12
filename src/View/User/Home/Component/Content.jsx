import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import Faq from "./Faq";

const Content = () => {
  const controls = useAnimation();

  const checkInView = async () => {
    const isInView = await controls.start("visible");
    if (isInView) {
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      id="landingpage"
      className="py-16 bg-gray-100"
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      onViewportEnter={checkInView}
    >
      {/* desktop */}
      <div className="container mx-auto text-center bg-white rounded-xl p-7 w-auto max-md:hidden max-[1023px]:hidden">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-4 font-serif"
          variants={scaleIn}
        >
          About Us
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-8 font-serif text-center"
          variants={scaleIn}
        >
          Welcome to our store, where the exploration of high-quality products
          meets an exceptional online shopping experience. Here at HKKS STORE,
          we understand that everyone has unique needs, and that's why we are
          committed to providing a diverse range of products that can meet your
          lifestyle and preferences. We embark on our journey with a simple
          goal: to make online shopping more enjoyable and satisfying. With a
          wide variety of product categories, we aim to give you access to
          essential items of the highest quality, ranging from everyday products
          to luxury goods. Diversity and quality are the core principles of our
          philosophy. We strive to offer the best products from various leading
          brands, ensuring that every purchase you make is an investment in
          quality and satisfaction. We take pride in being a trusted source of
          information. Our dedicated team is always ready to provide expert
          guidance and advice to help you make informed decisions. We understand
          that customer trust is the key to success, which is why we prioritize
          customer satisfaction at the heart of our service. Thank you for
          choosing HKKS STORE as your online shopping partner. Together, let's
          discover products that reflect your lifestyle, meet your needs, and
          provide an unforgettable shopping experience. Happy shopping!
        </motion.p>
        <motion.div className="flex justify-center mb-8" variants={scaleIn}>
          <motion.ul className="flex justify-center p-12 ">
            <div className="grid grid-cols-2 px-12 gap-12">
              <div className="flex  ">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 mt-1 mr-4 flex"
                />
                <p className="items-center text-justify font-serif">
                  provide quality products
                </p>
              </div>

              <div className="flex">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 mt-1 mr-4 flex"
                />
                <p className="items-center text-justify font-serif ">
                  Security in payment for all your shopping activities
                </p>
              </div>

              <div className="flex">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 mt-1 mr-4 flex"
                />
                <p className="items-center text-justify font-serif ">
                  There are many features that help you comfortably filter the
                  items you are looking for
                </p>
              </div>

              <div className="flex">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 mt-1 mr-4 flex"
                />
                <p className="items-center text-justify font-serif ">
                  displays a design that is comfortable to look at so you feel
                  at home shopping on our website
                </p>
              </div>
            </div>
          </motion.ul>
        </motion.div>

        <div className="font-semibold font-montserrat text-2xl mb-4">
          {" "}
          Frequently Asked Questions (FAQs)
        </div>

        <div>
          <Faq />
        </div>
        <motion.p
          className="text-lg text-gray-600 mb-8 font-serif"
          variants={scaleIn}
        >
          let's explore the world through valuable updates and information that
          enhance your shopping experience.
        </motion.p>
        <Link to="/shop">
          <motion.button
            className="bg-blue-500 font-serif hover:bg-blue-800 border-b-8 border-slate-500 hover:border-black text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            variants={scaleIn}
          >
            Get Started
          </motion.button>
        </Link>
      </div>

      {/* mobile 768px*/}

      <div className=" text-center p-7 bg-white lg:hidden">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-4 font-serif py-2"
          variants={scaleIn}
        >
          About Us
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-8 font-serif text-center"
          variants={scaleIn}
        >
          Welcome to our store, where the exploration of high-quality products
          meets an exceptional online shopping experience. Here at HKKS STORE,
          we understand that everyone has unique needs, and that's why we are
          committed to providing a diverse range of products that can meet your
          lifestyle and preferences. We embark on our journey with a simple
          goal: to make online shopping more enjoyable and satisfying. With a
          wide variety of product categories, we aim to give you access to
          essential items of the highest quality, ranging from everyday products
          to luxury goods. Diversity and quality are the core principles of our
          philosophy. We strive to offer the best products from various leading
          brands, ensuring that every purchase you make is an investment in
          quality and satisfaction. We take pride in being a trusted source of
          information. Our dedicated team is always ready to provide expert
          guidance and advice to help you make informed decisions. We understand
          that customer trust is the key to success, which is why we prioritize
          customer satisfaction at the heart of our service. Thank you for
          choosing HKKS STORE as your online shopping partner. Together, let's
          discover products that reflect your lifestyle, meet your needs, and
          provide an unforgettable shopping experience. Happy shopping!
        </motion.p>
        <motion.div className="flex justify-center" variants={scaleIn}>
          <motion.ul className="">
            <motion.li className="mb-2 grid grid-cols-1 font-serif gap-4 p-8 ">
              <div className="flex ">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 mt-1 mr-4 flex"
                />
                <p className="items-center text-justify ">
                  provide quality products
                </p>
              </div>

              <div className="flex">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 mt-1 mr-4 flex"
                />
                <p className="items-center text-justify ">
                  Security in payment for all your shopping activities
                </p>
              </div>

              <div className="flex">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 mt-1 mr-4 flex"
                />
                <p className="items-center text-justify ">
                  There are many features that help you comfortably filter the
                  items you are looking for.
                </p>
              </div>

              <div className="flex">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 mt-1 mr-4 flex"
                />
                <p className="items-center text-justify ">
                  displays a design that is comfortable to look at so you feel
                  at home shopping on our website.
                </p>
              </div>
            </motion.li>
          </motion.ul>
        </motion.div>

        <div className="font-semibold font-montserrat text-2xl mb-4">
          Frequently Asked Questions (FAQs)
        </div>
        <Faq />

        <motion.p
          className="text-lg text-gray-600 mb-8 font-serif"
          variants={scaleIn}
        >
          let's explore the world through valuable updates and information that
          enhance your shopping experience.
        </motion.p>

        <Link to="/shop">
          <motion.button
            className="bg-blue-500 font-serif hover:bg-blue-800 border-b-8 border-slate-500 hover:border-black text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            variants={scaleIn}
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </motion.section>
  );
};

export default Content;
