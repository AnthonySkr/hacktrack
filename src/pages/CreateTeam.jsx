import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTeam() {
   const [teamName, setTeamName] = useState("");
   const [hackathonId, setHackathonId] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch("/teams/create", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`, // token JWT
            },
            body: JSON.stringify({
               name: teamName,
               hackathonId: parseInt(hackathonId),
            }),
         });
         if (response.ok) {
            navigate("/hackathons");
         } else {
            const data = await response.json();
            console.error(data.error);
         }
      } catch (error) {
         console.error("Error creating team:", error);
      }
   };

   return (
      <div>
         <h2>Create a Team</h2>
         <form onSubmit={handleSubmit}>
            <label>
               Team Name:
               <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
               />
            </label>
            <label>
               Hackathon ID:
               <input
                  type="text"
                  value={hackathonId}
                  onChange={(e) => setHackathonId(e.target.value)}
                  required
               />
            </label>
            <button type="submit">Create Team</button>
         </form>
      </div>
   );
}

export default CreateTeam;
