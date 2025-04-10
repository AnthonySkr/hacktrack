import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <StrictMode>
      <BrowserRouter>
         <AuthProvider>
            <App />
         </AuthProvider>
      </BrowserRouter>
   </StrictMode>
);
