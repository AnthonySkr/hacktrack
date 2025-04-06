import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate

function HackathonDetails() {
   const { id } = useParams();
   const navigate = useNavigate(); // Replace useHistory with useNavigate
   const [hackathon, setHackathon] = useState(null);
   const [teamName, setTeamName] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const [user, setUser] = useState(null); // Information utilisateur pour vérifier l'authentification

   useEffect(() => {
      // Chargement du hackathon
      axios
         .get(`http://localhost:3002/hackathons/${id}`)
         .then((res) => setHackathon(res.data))
         .catch((err) =>
            console.error("Erreur lors du chargement du hackathon", err)
         );

      // Chargement des informations utilisateur pour vérifier l'authentification
      axios
         .get("http://localhost:3002/auth/me", {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         })
         .then((res) => setUser(res.data))
         .catch(() => setUser(null));
   }, [id]);

   const handleCreateTeam = (e) => {
      e.preventDefault();
      if (!user) {
         setErrorMessage("Vous devez être connecté pour créer une équipe.");
         return;
      }

      if (!teamName.trim()) {
         setErrorMessage("Le nom de l'équipe ne peut pas être vide.");
         return;
      }

      // Création de l'équipe
      axios
         .post(
            "http://localhost:3002/teams/create",
            { name: teamName, hackathonId: Number(id) }, // Convertir id en nombre
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }
         )
         .then((res) => {
            alert("Équipe créée avec succès");
            setTeamName(""); // Réinitialiser le nom de l'équipe
            navigate(`/hackathons/${id}`);
         })
         .catch((err) => {
            const error =
               err.response?.data?.error ||
               "Erreur lors de la création de l'équipe";
            setErrorMessage(
               typeof error === "string" ? error : JSON.stringify(error)
            );
         });
   };

   // Affichage des erreurs
   {
      errorMessage && (
         <p style={styles.error}>
            {typeof errorMessage === "string"
               ? errorMessage
               : "Une erreur est survenue."}
         </p>
      );
   }

   const handleJoinTeam = (teamId) => {
      if (!user) {
         setErrorMessage("Vous devez être connecté pour rejoindre une équipe.");
         return;
      }

      // Rejoindre une équipe existante
      axios
         .post(
            `http://localhost:3002/teams/join/${teamId}`,
            {},
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            }
         )
         .then((res) => {
            alert("Vous avez rejoint l'équipe avec succès.");
            navigate(`/hackathons/${id}`); // Replace history.push with navigate
         })
         .catch((err) =>
            setErrorMessage(
               err.response?.data?.error ||
                  "Erreur lors de l'adhésion à l'équipe"
            )
         );
   };

   if (!hackathon) return <p>Chargement...</p>;

   return (
      <div style={styles.container}>
         <h1>{hackathon.name}</h1>
         <p>
            Date: {hackathon.startDate} - {hackathon.endDate}
         </p>
         <p>Thème: {hackathon.theme}</p>

         {/* Affichage du formulaire de création d'équipe si l'utilisateur est connecté */}
         {user && (
            <div>
               <h3>Créer une équipe</h3>
               <form onSubmit={handleCreateTeam}>
                  <input
                     type="text"
                     placeholder="Nom de l'équipe"
                     value={teamName}
                     onChange={(e) => setTeamName(e.target.value)}
                     required
                  />
                  <button type="submit">Créer</button>
               </form>
            </div>
         )}

         {/* Affichage du message d'erreur si nécessaire */}
         {errorMessage && <p style={styles.error}>{errorMessage}</p>}

         <h2>Équipes inscrites</h2>
         <ul style={styles.list}>
            {hackathon.teams.map((team) => (
               <li key={team.id} style={styles.item}>
                  <span>{team.name}</span>
                  {user && (
                     <button
                        onClick={() => handleJoinTeam(team.id)}
                        style={styles.joinButton}>
                        Rejoindre
                     </button>
                  )}
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
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   joinButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "5px 10px",
      border: "none",
      cursor: "pointer",
   },
   error: {
      color: "red",
      fontWeight: "bold",
   },
};

export default HackathonDetails;
