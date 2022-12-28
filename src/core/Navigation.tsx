import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import MainScreen from "../screens/MainScreen";
import StudentScreen from "../screens/StudentScreen";

const renderRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/elev/:nrMatricol" element={<StudentScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

const Navigation = () => {
  return renderRouter();
};

export default Navigation;
