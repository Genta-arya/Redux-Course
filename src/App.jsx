import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
                <HomePage />
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/slot" element={<SlotMachine />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/game" element={<GameList />} />
        <Route path="/history" element={<History />} />

        <Route path="/Error" element={<ErrorPage />} />
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
                <IndexLp />
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route path="*" element={<DetailNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
