import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

function HackathonDetails() {
   const { id } = useParams();
   const [hackathon, setHackathon] = useState(null);
   const [teamName, setTeamName] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            // Charger les données du hackathon
            const hackathonRes = await axios.get(
               `http://localhost:3002/hackathons/${id}`
            );
            setHackathon(hackathonRes.data);

            // Charger les informations utilisateur
            const userRes = await axios.get("http://localhost:3002/auth/me", {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            });
            setUser(userRes.data);
         } catch (err) {
            console.error("Erreur lors du chargement des données", err);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [id]);

   const formatDate = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   };

   const handleCreateTeam = async (e) => {
      e.preventDefault();
      if (!user) {
         alert("Vous devez être connecté pour créer une équipe.");
         return;
      }

      if (!teamName.trim()) {
         setErrorMessage("Le nom de l'équipe ne peut pas être vide.");
         return;
      }

      try {
         await axios.post(
            "http://localhost:3002/teams/create",
            { name: teamName, hackathonId: Number(id) },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }
         );
         alert("Équipe créée avec succès");
         setTeamName("");
         window.location.reload(); // Recharger la page pour mettre à jour l'état
      } catch (err) {
         const error =
            err.response?.data?.error ||
            "Erreur lors de la création de l'équipe";
         setErrorMessage(
            typeof error === "string" ? error : JSON.stringify(error)
         );
      }
   };

   const handleJoinTeam = async (teamId) => {
      if (!user) {
         alert("Vous devez être connecté pour rejoindre une équipe.");
         return;
      }

      try {
         await axios.post(
            `http://localhost:3002/teams/join/${teamId}`,
            {},
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }
         );
         alert("Vous avez rejoint l'équipe avec succès.");
         window.location.reload(); // Recharger la page pour mettre à jour l'état
      } catch (err) {
         setErrorMessage(
            err.response?.data?.error || "Erreur lors de l'adhésion à l'équipe"
         );
      }
   };

   if (loading) return <Loader />;

   if (!hackathon) return <p>Hackathon introuvable.</p>;

   // Vérifier si le hackathon est passé
   const isHackathonOver = new Date(hackathon.endDate) < new Date();

   return (
      <div style={styles.container}>
         <h1 style={styles.title}>{hackathon.name}</h1>
         <p style={styles.info}>
            <strong>Date :</strong> {formatDate(hackathon.startDate)} -{" "}
            {formatDate(hackathon.endDate)}
         </p>
         <p style={styles.info}>
            <strong>Thème :</strong> {hackathon.theme}
         </p>

         {!isHackathonOver && (
            <div style={styles.actions}>
               <div style={styles.createTeam}>
                  <h3>Créer une équipe</h3>
                  <form onSubmit={handleCreateTeam}>
                     <input
                        type="text"
                        placeholder="Nom de l'équipe"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        style={styles.input}
                        required
                     />
                     <button type="submit" style={styles.createButton}>
                        Créer
                     </button>
                  </form>
               </div>
            </div>
         )}

         <h3>Équipes inscrites</h3>
         <ul style={styles.list}>
            {hackathon.teams.map((team) => (
               <li key={team.id} style={styles.item}>
                  <span>{team.name}</span>
                  {!isHackathonOver && (
                     <button
                        onClick={() => handleJoinTeam(team.id)}
                        style={styles.joinButton}>
                        Rejoindre
                     </button>
                  )}
               </li>
            ))}
         </ul>

         {isHackathonOver && (
            <p style={styles.info}>
               Ce hackathon est terminé. Vous ne pouvez plus créer ou rejoindre
               une équipe.
            </p>
         )}

         {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      </div>
   );
}

const styles = {
   container: {
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
   },
   title: {
      fontSize: "2rem",
      marginBottom: "1rem",
      color: "#333",
   },
   info: {
      marginBottom: "1rem",
      color: "#555",
   },
   createTeam: {
      marginBottom: "2rem",
   },
   input: {
      padding: "0.5rem",
      marginRight: "1rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
   },
   createButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
   },
   actions: {
      marginBottom: "2rem",
   },
   list: {
      listStyleType: "none",
      padding: 0,
   },
   item: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
      padding: "0.5rem",
      backgroundColor: "#fff",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
   },
   joinButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
   },
   error: {
      color: "red",
      fontWeight: "bold",
      marginBottom: "1rem",
   },
};

export default HackathonDetails;
