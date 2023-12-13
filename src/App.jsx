import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import LoadingSpinner from "./View/User/Component/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    const handleUnload = () => {
      setIsLoading(true);
    };

    window.addEventListener("load", handleLoad);
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useEffect(() => {
    const handleReadyStateChange = () => {
      if (document.readyState === "loading") {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    };

    document.addEventListener("readystatechange", handleReadyStateChange);

    return () => {
      document.removeEventListener("readystatechange", handleReadyStateChange);
    };
  }, []);

  // Check if the screen width is less than or equal to 768 pixels (adjust as needed)
  const isMobile = window.innerWidth <= 1000;

  return (
    <BrowserRouter>
      {isLoading && !isMobile ? (
        <LoadingSpinner />
      ) : (
        <Routes>
          <Route path="/shop" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/slot" element={<SlotMachine />} />
          <Route path="/quiz" element={<QuizApp />} />
          <Route path="/game" element={<GameList />} />
          <Route path="/history" element={<History />} />
          <Route path="/Error" element={<ErrorPage />} />
          <Route path="/" element={<IndexLp />} />
          <Route path="*" element={<DetailNotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
