import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";

function Hackathons() {
   const [hackathons, setHackathons] = useState([]);
   const [loading, setLoading] = useState(true);
   const [showUpcoming, setShowUpcoming] = useState(true);

   useEffect(() => {
      axios
         .get("http://localhost:3002/hackathons")
         .then((res) => setHackathons(res.data))
         .catch((err) =>
            console.error("Erreur lors du chargement des hackathons", err)
         )
         .finally(() => setLoading(false));
   }, []);

   if (loading) return <Loader />;

   // Séparer les hackathons en deux catégories
   const today = new Date();
   const upcomingHackathons = hackathons.filter(
      (hackathon) => new Date(hackathon.startDate) >= today
   );
   const pastHackathons = hackathons.filter(
      (hackathon) => new Date(hackathon.startDate) < today
   );

   return (
      <div style={styles.container}>
         <h1 style={styles.title}>Tous les hackathons</h1>
         <div style={styles.toggleButtons}>
            <button
               style={showUpcoming ? styles.activeButton : styles.button}
               onClick={() => setShowUpcoming(true)}>
               À venir
            </button>
            <button
               style={!showUpcoming ? styles.activeButton : styles.button}
               onClick={() => setShowUpcoming(false)}>
               Passés
            </button>
         </div>
         <div style={styles.cards}>
            {(showUpcoming ? upcomingHackathons : pastHackathons).map(
               (hackathon) => (
                  <Card
                     key={hackathon.id}
                     id={hackathon.id}
                     name={hackathon.name}
                     startDate={hackathon.startDate}
                     endDate={hackathon.endDate}
                     theme={hackathon.theme}
                     registeredTeams={hackathon.registeredTeams}
                  />
               )
            )}
         </div>
      </div>
   );
}

const styles = {
   container: { padding: "2rem" },
   title: { fontSize: "2rem", marginBottom: "1.5rem", color: "#333" },
   toggleButtons: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "1.5rem",
      gap: "1rem",
   },
   button: {
      padding: "0.5rem 1rem",
      border: "1px solid #ddd",
      backgroundColor: "#f5f5f5",
      color: "#333",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "background-color 0.3s ease",
   },
   activeButton: {
      padding: "0.5rem 1rem",
      border: "1px solid #e94560",
      backgroundColor: "#e94560",
      color: "#fff",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "background-color 0.3s ease",
   },
   cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem",
   },
};

export default Hackathons;
