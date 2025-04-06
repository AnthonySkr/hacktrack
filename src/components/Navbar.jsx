import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
   const navigate = useNavigate();
   const { user, logout } = useContext(AuthContext);

   const handleLogout = () => {
      logout();
      navigate("/");
   };

   return (
      <nav style={styles.nav}>
         <Link to="/" style={styles.logo}>
            HackTrack
         </Link>

         <div style={styles.links}>
            <Link to="/hackathons" style={styles.link}>
               Voir les Hackathons
            </Link>

            {!user ? (
               <>
                  <Link to="/register" style={styles.button}>
                     S'inscrire
                  </Link>
                  <Link to="/login" style={styles.button}>
                     Se connecter
                  </Link>
               </>
            ) : (
               <button onClick={handleLogout} style={styles.button}>
                  Se déconnecter
               </button>
            )}
         </div>
      </nav>
   );
}

const styles = {
   nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#1a1a2e",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
   },
   logo: {
      fontWeight: "bold",
      fontSize: "1.5rem",
      textDecoration: "none",
      color: "#e94560",
   },
   links: {
      display: "flex",
      gap: "1.5rem",
   },
   link: {
      textDecoration: "none",
      color: "#eaeaea",
      fontSize: "1rem",
      transition: "color 0.3s ease",
   },
   linkHover: {
      color: "#e94560",
   },
   button: {
      padding: "0.5rem 1rem",
      border: "none",
      backgroundColor: "#e94560",
      color: "#fff",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",
   },
   buttonHover: {
      backgroundColor: "#d33f57",
   },
};

export default Navbar;
