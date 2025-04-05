import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Hackathons from "../pages/Hackathons";
import HackathonDetail from "../pages/HackathonDetail";
import Register from "../pages/Register";
import Login from "../pages/Login";

const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/hackathons" element={<Hackathons />} />
         <Route path="/hackathons/:id" element={<HackathonDetail />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
      </Routes>
   );
};

export default AppRoutes;
