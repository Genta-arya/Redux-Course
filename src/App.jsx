import React from "react";
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shop" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/slot" element={<SlotMachine />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/game" element={<GameList />} />
        <Route path="/history" element={<History/>} />
        <Route path="/Error" element={<ErrorPage />} />
        <Route path="*" element={<DetailNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
