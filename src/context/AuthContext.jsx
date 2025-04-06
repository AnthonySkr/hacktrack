import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(localStorage.getItem("token"));

   useEffect(() => {
      if (token) {
         axios
            .get("http://localhost:3002/auth/me", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            })
            .then((res) => setUser(res.data))
            .catch(() => {
               localStorage.removeItem("token");
               setToken(null);
               setUser(null);
            });
      }
   }, [token]);

   const login = (jwt) => {
      localStorage.setItem("token", jwt);
      setToken(jwt);
   };

   const logout = () => {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
   };

   return (
      <AuthContext.Provider value={{ user, login, logout, token }}>
         {children}
      </AuthContext.Provider>
   );
}
