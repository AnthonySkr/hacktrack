import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function Home() {
   const [hackathons, setHackathons] = useState([]);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      axios
         .get("http://localhost:3002/hackathons")
         .then((res) => {
            const today = new Date();
            // Filtrer les hackathons à venir et limiter à 3
            const upcomingHackathons = res.data
               .filter((hackathon) => new Date(hackathon.startDate) >= today)
               .slice(0, 3);
            setHackathons(upcomingHackathons);
         })
         .catch((err) =>
            console.error("Erreur lors du chargement des hackathons", err)
         )
         .finally(() => setLoading(false));
   }, []);

   if (loading) return <Loader />;

   return (
      <div style={styles.container}>
         <h1 style={styles.title}>Bienvenue sur HackTrack</h1>
         <h2 style={styles.subtitle}>Les prochains hackathons :</h2>
         <div style={styles.cards}>
            {hackathons.map((hackathon) => (
               <Card
                  key={hackathon.id}
                  id={hackathon.id}
                  name={hackathon.name}
                  startDate={hackathon.startDate}
                  endDate={hackathon.endDate}
                  theme={hackathon.theme}
                  registeredTeams={hackathon.registeredTeams}
               />
            ))}
         </div>
         <div style={styles.buttonContainer}>
            <button
               style={styles.button}
               onClick={() => navigate("/hackathons")}>
               Voir plus
            </button>
         </div>
      </div>
   );
}

const styles = {
   container: { padding: "2rem" },
   title: { fontSize: "2rem", marginBottom: "1rem", color: "#333" },
   subtitle: { fontSize: "1.5rem", marginBottom: "1.5rem", color: "#555" },
   cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem",
   },
   buttonContainer: {
      textAlign: "center",
      marginTop: "2rem",
   },
   button: {
      padding: "10px 20px",
      fontSize: "1rem",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
   },
   buttonHover: {
      backgroundColor: "#0056b3",
   },
};

export default Home;
