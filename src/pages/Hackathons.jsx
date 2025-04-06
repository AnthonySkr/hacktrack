import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HackathonsPage() {
   const [hackathons, setHackathons] = useState([]); // Initialisation avec un tableau vide
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   useEffect(() => {
      axios
         .get("http://localhost:3002/hackathons", {
            params: { page: currentPage, limit: 5 },
         })
         .then((res) => {
            if (res.data && Array.isArray(res.data)) {
               setHackathons(res.data);
               // Assurez-vous que totalPages est correctement calculé selon le nombre total d'éléments
               // Si l'API ne renvoie pas totalPages, vous devez l'ajouter dans la réponse de l'API.
            } else {
               console.error("Données incorrectes reçues de l'API");
            }
         })
         .catch((err) => {
            console.error("Erreur lors du chargement des hackathons", err);
         });
   }, [currentPage]);

   const handlePageChange = (page) => {
      setCurrentPage(page);
   };

   if (!hackathons || hackathons.length === 0) {
      return <p>Aucun hackathon trouvé.</p>;
   }

   return (
      <div style={styles.container}>
         <h1>Tous les hackathons</h1>
         <ul style={styles.list}>
            {hackathons.map((hackathon) => (
               <li key={hackathon.id} style={styles.item}>
                  <Link to={`/hackathons/${hackathon.id}`} style={styles.link}>
                     {hackathon.name}
                  </Link>
                  <p>{hackathon.startDate}</p>
               </li>
            ))}
         </ul>

         <div style={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
               <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  style={styles.pageButton}>
                  {index + 1}
               </button>
            ))}
         </div>
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
   pagination: {
      display: "flex",
      gap: "0.5rem",
      marginTop: "1rem",
   },
   pageButton: {
      padding: "0.5rem 1rem",
      border: "1px solid #333",
      cursor: "pointer",
   },
};

export default HackathonsPage;
