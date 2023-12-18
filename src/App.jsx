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
import ogImage from "./assets/seo.png";

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
                    <title>HKKS SHOP - Store</title>
                    <meta
                      name="description"
                      content="  Welcome to our store, where the exploration of high-quality products
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
          provide an unforgettable shopping experience. Happy shopping!"
                    />
                    <meta name="keywords" content="Hkks Store" />
                    <meta property="og:title" content="HKKS SHOP - Store" />
                    <meta
                      property="og:description"
                      content="  Welcome to our store, where the exploration of high-quality products
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
          provide an unforgettable shopping experience. Happy shopping!"
                    />
                    <meta property="og:image" content={ogImage} />
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
                <meta name="description" content="Deskripsi halaman login" />
                <meta property="og:title" content="HKKS SHOP - Login" />
                <meta
                  property="og:description"
                  content="Deskripsi halaman login"
                />
                <meta property="og:image" content={ogImage} />
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
                  content="Deskripsi halaman registrasi"
                />
                <meta property="og:title" content="HKKS SHOP - Register" />
                <meta
                  property="og:description"
                  content="Deskripsi halaman registrasi"
                />
                <meta property="og:image" content={ogImage} />
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
                <title>HKKS SHOP - Slot</title>
                <meta name="description" content="Deskripsi halaman slot" />
                <meta property="og:title" content="HKKS SHOP - Slot" />
                <meta
                  property="og:description"
                  content="Deskripsi halaman slot"
                />
                <meta property="og:image" content={ogImage} />
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
                <meta name="description" content="Deskripsi halaman quiz" />
                <meta property="og:title" content="HKKS SHOP - Quiz" />
                <meta
                  property="og:description"
                  content="Deskripsi halaman quiz"
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
                <meta
                  property="og:description"
                  content="Deskripsi halaman daftar permainan"
                />
                <meta property="og:image" content={ogImage} />
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
                <title>HKKS SHOP - History</title>
                <meta name="description" content="Deskripsi halaman riwayat" />
                <meta property="og:title" content="HKKS SHOP - History" />
                <meta
                  property="og:description"
                  content="Deskripsi halaman riwayat"
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
                <meta name="description" content="Deskripsi halaman error" />
                <meta property="og:title" content="HKKS SHOP - Error" />
                <meta
                  property="og:description"
                  content="Deskripsi halaman error"
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
                      content="  Welcome to our store, where the exploration of high-quality products
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
          provide an unforgettable shopping experience. Happy shopping!"
                    />
                    <meta property="og:title" content="HKKS SHOP" />
                    <meta
                      property="og:description"
                      content="  Welcome to our store, where the exploration of high-quality products
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
          provide an unforgettable shopping experience. Happy shopping!"
                    />
                    <meta property="og:image" content={ogImage} />
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
                <meta property="og:image" content={ogImage} />
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
