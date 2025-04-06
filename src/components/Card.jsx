import { Link } from "react-router-dom";

function Card({ id, name, startDate, endDate, theme, registeredTeams }) {
   // Formater les dates
   const formatDate = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   };

   return (
      <div style={styles.card}>
         <h3 style={styles.title}>{name}</h3>
         <p style={styles.info}>
            <strong>Thème :</strong> {theme}
         </p>
         <p style={styles.info}>
            <strong>Date :</strong> {formatDate(startDate)} -{" "}
            {formatDate(endDate)}
         </p>
         <p style={styles.info}>
            <strong>Équipes inscrites :</strong> {registeredTeams}
         </p>
         <Link to={`/hackathons/${id}`} style={styles.link}>
            Voir les détails
         </Link>
      </div>
   );
}

const styles = {
   card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      backgroundColor: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
   },
   title: {
      fontSize: "1.25rem",
      marginBottom: "0.5rem",
      color: "#333",
   },
   info: {
      margin: "0.5rem 0",
      color: "#555",
   },
   link: {
      textDecoration: "none",
      color: "#e94560",
      fontWeight: "bold",
      marginTop: "1rem",
      display: "inline-block",
   },
};

export default Card;
