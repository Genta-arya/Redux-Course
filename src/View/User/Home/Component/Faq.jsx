import { motion } from "framer-motion";
import React from "react";

const Faq = () => {
  const kategori = [
    "Fashion",
    "Electronic",
    "Jewerly",
    "Gadgets and Technology",
    "Outdoor and Sports Equipment",
    "Beauty and Personal Care",
    "Accessories",
    "Home Goods",
    "Clothing",
  ];

  return (
    <motion.div className="flex justify-center">
      <motion.div className=" lg:w-1/2">
        <motion.div
          className="collapse collapse-arrow border border-base-300 bg-base-200 mb-4 "
          tabIndex={0}
        >
          <motion.div className="collapse-title text-md font-medium text-left  ">
            1. What types of products are available in your store?
          </motion.div>

          <div className="collapse-content">
            <p className="text-left">
              Our store offers a diverse range of essential items to meet your
              needs. Explore our collection, including but not limited to:
            </p>
            <div className="grid grid-cols-1">
              {kategori.map((category, index) => (
                <p className="text-left" key={index}>
                  {index + 1}. {category}
                </p>
              ))}
            </div>
          </div>

          <motion.div tabIndex={0} className="collapse collapse-arrow   mb-4 ">
            <motion.div className="collapse-title text-md font-medium text-left">
              2. How do I know the information about the products in your store
              is accurate?
            </motion.div>

            <div className="collapse-content">
              <p className="text-left">
                We are committed to providing accurate and reliable information
                about our products. Your trust is important to us, and we strive
                to be a dependable source for product details and updates.
              </p>
            </div>
          </motion.div>

          <motion.div tabIndex={0} className="collapse collapse-arrow   mb-4 ">
            <motion.div className="collapse-title text-md font-medium text-left">
              3. Can I find clothing, electronics, fashion, and jewelry in your
              store?
            </motion.div>

            <div className="collapse-content">
              <p className="text-left">
                We are committed to providing accurate and reliable information
                about our products. Your trust is important to us, and we strive
                to be a dependable source for product details and updates.
              </p>
            </div>
          </motion.div>

          <motion.div tabIndex={0} className="collapse collapse-arrow   mb-4 ">
            <motion.div className="collapse-title text-md font-medium text-left">
              4. Can I find clothing, electronics, fashion, and jewelry in your
              store?
            </motion.div>

            <div className="collapse-content">
              <p className="text-left">
                Absolutely! Our store offers a curated selection of clothing,
                electronics, fashion items, and jewelry. Discover high-quality
                items across various categories to meet your preferences.
              </p>
            </div>
          </motion.div>

          <motion.div tabIndex={0} className="collapse collapse-arrow   mb-4 ">
            <motion.div className="collapse-title text-md font-medium text-left">
              5. What payment methods do you accept for purchases? store?
            </motion.div>

            <div className="collapse-content">
              <p className="text-left">
                We accept various payment methods to provide you with
                flexibility and convenience during the checkout process. Review
                our payment options to choose the one that suits you best
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Faq;
