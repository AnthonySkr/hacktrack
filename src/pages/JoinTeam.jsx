import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinTeam() {
   const [teams, setTeams] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchTeams = async () => {
         const response = await fetch("/hackathons/{hackathonId}/teams", {
            // hackathonId dynamique
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });
         const data = await response.json();
         setTeams(data);
      };
      fetchTeams();
   }, []);

   const handleJoin = async (teamId) => {
      try {
         const response = await fetch(`/teams/join/${teamId}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`, // token JWT
            },
         });
         if (response.ok) {
            navigate("/hackathons");
         } else {
            const data = await response.json();
            console.error(data.error);
         }
      } catch (error) {
         console.error("Error joining team:", error);
      }
   };

   return (
      <div>
         <h2>Join a Team</h2>
         <ul>
            {teams.map((team) => (
               <li key={team.id}>
                  <p>{team.name}</p>
                  <button onClick={() => handleJoin(team.id)}>Join</button>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default JoinTeam;
