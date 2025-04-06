import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Hackathons from "../pages/Hackathons";
import HackathonDetails from "../pages/HackathonDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";

function AppRouter() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/hackathons" element={<Hackathons />} />
         <Route path="/hackathons/:id" element={<HackathonDetails />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
      </Routes>
   );
}

export default AppRouter;
