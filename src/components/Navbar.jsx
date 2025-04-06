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
               Hackathons
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
      padding: "1rem",
      borderBottom: "1px solid #ddd",
   },
   logo: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      textDecoration: "none",
      color: "#333",
   },
   links: {
      display: "flex",
      gap: "1rem",
   },
   link: {
      textDecoration: "none",
      color: "#555",
   },
   button: {
      padding: "0.4rem 0.8rem",
      border: "1px solid #555",
      background: "transparent",
      cursor: "pointer",
      borderRadius: "4px",
      textDecoration: "none",
      color: "#333",
   },
};

export default Navbar;
