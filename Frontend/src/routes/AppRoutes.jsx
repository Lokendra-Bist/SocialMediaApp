import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
