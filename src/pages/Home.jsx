import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
   const [hackathons, setHackathons] = useState([]);

   useEffect(() => {
      axios
         .get("http://localhost:3002/hackathons", {
            params: { limit: 3 },
         })
         .then((res) => setHackathons(res.data))
         .catch((err) =>
            console.error("Erreur lors du chargement des hackathons", err)
         );
   }, []);

   return (
      <div style={styles.container}>
         <h1>Bienvenue sur HackTrack</h1>
         <h2>Les prochains hackathons :</h2>
         <ul style={styles.list}>
            {hackathons.map((hackathon) => (
               <li key={hackathon.id} style={styles.item}>
                  <Link to={`/hackathons/${hackathon.id}`} style={styles.link}>
                     {hackathon.name}
                  </Link>
                  <p>{hackathon.date}</p>
               </li>
            ))}
         </ul>
      </div>
   );
}

const styles = {
   container: {
      padding: "1rem",
   },
   list: {
      listStyleType: "none",
      paddingLeft: 0,
   },
   item: {
      marginBottom: "1rem",
   },
   link: {
      textDecoration: "none",
      fontWeight: "bold",
      color: "#333",
   },
};

export default Home;
