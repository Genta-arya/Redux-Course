// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import HomePage from "./View/User/Home/Index";
import DetailNotFound from "./View/User/Component/404";
import ErrorPage from "./View/User/Component/ErrorPage";
import History from "./View/User/Component/productlist/History";
import LoginForm from "./View/User/Auth/Login";
import Register from "./View/User/Auth/Register";
import SlotMachine from "./View/User/Component/Game/Slot/Slot";
import GameList from "./View/User/Component/Game/Index";
import QuizApp from "./View/User/Component/Game/Quiz/Index";
import IndexLp from "./View/User/Home/Component/Index";
import ogImage from "./assets/seo.png"; // Replace with the correct path to your image

const App = () => {
  const animationDuration = 1;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/shop"
          element={
            <AnimatePresence exitBeforeEnter={false}>
              <motion.div
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <Helmet>
                    <title>HKKS SHOP - Shop</title>
                    <meta
                      name="description"
                      content="Discover the beauty of online shopping at HKKS SHOP. Find high-quality products to meet all your needs."
                    />
                    <meta
                      name="keywords"
                      content="online shopping, high-quality products, HKKS SHOP, fashion, electronics"
                    />
                    <meta property="og:title" content="HKKS SHOP - Shop" />
                    <meta
                      property="og:description"
                      content="Discover the beauty of online shopping at HKKS SHOP. Find high-quality products to meet all your needs."
                    />
                    <meta
                      property="og:image"
                      content="https://www.hkks.shop/assets/seo-Fa8QA_Wv.png"
                    />
                  </Helmet>
                  <HomePage />
                </div>
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <Helmet>
                <title>HKKS SHOP - Login</title>
                <meta
                  name="description"
                  content="Log in to your HKKS SHOP account. Enjoy a secure and seamless login experience to access your personalized shopping profile."
                />
                <meta property="og:title" content="HKKS SHOP - Login" />
                <meta
                  property="og:description"
                  content="Log in to your HKKS SHOP account. Enjoy a secure and seamless login experience to access your personalized shopping profile."
                />
                <meta
                  property="og:image"
                  content="https://www.hkks.shop/assets/seo-Fa8QA_Wv.png"
                />
              </Helmet>
              <LoginForm />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div>
              <Helmet>
                <title>HKKS SHOP - Register</title>
                <meta
                  name="description"
                  content="Create your HKKS SHOP account and join our community. Register now to explore a world of high-quality products and personalized shopping experiences."
                />
                <meta property="og:title" content="HKKS SHOP - Register" />
                <meta
                  property="og:description"
                  content="Create your HKKS SHOP account and join our community. Register now to explore a world of high-quality products and personalized shopping experiences."
                />
                <meta
                  property="og:image"
                  content="https://www.hkks.shop/assets/seo-Fa8QA_Wv.png"
                />
              </Helmet>

              <Register />
            </div>
          }
        />
        <Route
          path="/slot"
          element={
            <div>
              <Helmet>
                <title>HKKS SHOP - Slot Games</title>
                <meta
                  name="description"
                  content="Experience the thrill of HKKS SHOP's slot games. Play exciting and entertaining slots for a chance to win big rewards. Join the fun now and try your luck!"
                />
                <meta property="og:title" content="HKKS SHOP - Slot Games" />
                <meta
                  property="og:description"
                  content="Experience the thrill of HKKS SHOP's slot games. Play exciting and entertaining slots for a chance to win big rewards. Join the fun now and try your luck!"
                />
              </Helmet>

              <SlotMachine />
            </div>
          }
        />
        <Route
          path="/quiz"
          element={
            <div>
              <Helmet>
                <title>HKKS SHOP - Quiz</title>
                <meta
                  name="description"
                  content="Challenge yourself with HKKS SHOP's interactive quizzes. Test your knowledge, have fun, and discover exciting facts about our products. Join the quiz now and enjoy a unique learning experience!"
                />
                <meta property="og:title" content="HKKS SHOP - Quiz" />
                <meta
                  property="og:description"
                  content="Challenge yourself with HKKS SHOP's interactive quizzes. Test your knowledge, have fun, and discover exciting facts about our products. Join the quiz now and enjoy a unique learning experience!"
                />
                <meta property="og:image" content={ogImage} />
              </Helmet>
              <QuizApp />
            </div>
          }
        />
        <Route
          path="/game"
          element={
            <div>
              <Helmet>
                <title>HKKS SHOP - Game List</title>
                <meta
                  name="description"
                  content="Deskripsi halaman daftar permainan"
                />
                <meta property="og:title" content="HKKS SHOP - Game List" />
              </Helmet>
              <GameList />
            </div>
          }
        />
        <Route
          path="/history"
          element={
            <div>
              <Helmet>
                <title>HKKS SHOP - Purchase History</title>
                <meta
                  name="description"
                  content="Explore your shopping journey with HKKS SHOP. View and track your purchase history for a personalized and convenient shopping experience. Dive into your past orders and relive the excitement of each purchase."
                />
                <meta
                  property="og:title"
                  content="HKKS SHOP - Purchase History"
                />
                <meta
                  property="og:description"
                  content="Explore your shopping journey with HKKS SHOP. View and track your purchase history for a personalized and convenient shopping experience. Dive into your past orders and relive the excitement of each purchase."
                />
                <meta property="og:image" content={ogImage} />
              </Helmet>

              <History />
            </div>
          }
        />
        <Route
          path="/Error"
          element={
            <div>
              <Helmet>
                <title>HKKS SHOP - Error</title>
                <meta
                  name="description"
                  content="Oops! Something went wrong on HKKS SHOP. We apologize for the inconvenience. Our team is working to fix the issue. Please try again later or contact our support for assistance."
                />
                <meta property="og:title" content="HKKS SHOP - Error" />
                <meta
                  property="og:description"
                  content="Oops! Something went wrong on HKKS SHOP. We apologize for the inconvenience. Our team is working to fix the issue. Please try again later or contact our support for assistance."
                />
                <meta property="og:image" content={ogImage} />
              </Helmet>

              <ErrorPage />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <AnimatePresence exitBeforeEnter={false}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: animationDuration, ease: "easeOut" }}
              >
                <div>
                  <Helmet>
                    <title>HKKS SHOP</title>
                    <meta
                      name="description"
                      content="Welcome to HKKS SHOP, your one-stop destination for high-quality products and an exceptional online shopping experience. Explore a diverse range of products, from everyday essentials to luxury goods. Discover the joy of online shopping with us!"
                    />
                    <meta property="og:title" content="HKKS SHOP" />
                    <meta
                      property="og:description"
                      content="Welcome to HKKS SHOP, your one-stop destination for high-quality products and an exceptional online shopping experience. Explore a diverse range of products, from everyday essentials to luxury goods. Discover the joy of online shopping with us!"
                    />
                    <meta
                      property="og:image"
                      content="https://www.hkks.shop/assets/seo-Fa8QA_Wv.png"
                    />
                  </Helmet>

                  <IndexLp />
                </div>
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route
          path="*"
          element={
            <div>
              <Helmet>
                <title>HKKS SHOP - Not Found</title>
                <meta
                  name="description"
                  content="Deskripsi halaman tidak ditemukan"
                />
                <meta property="og:title" content="HKKS SHOP - Not Found" />
                <meta
                  property="og:description"
                  content="Deskripsi halaman tidak ditemukan"
                />
                <meta
                  property="og:image"
                  content="https://www.hkks.shop/assets/seo-Fa8QA_Wv.png"
                />
              </Helmet>
              <DetailNotFound />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
