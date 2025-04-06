const API_BASE_URL = "http://localhost:3002/auth";

// Fonction pour l'inscription
export const registerUser = async (userData) => {
   const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
         errorData.message || "Une erreur est survenue lors de l'inscription."
      );
   }

   return response.json(); // Retourne les données de la réponse
};

// Fonction pour la connexion
export const loginUser = async (credentials) => {
   const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Identifiants invalides.");
   }

   return response.json(); // Retourne le JWT ou les données utilisateur
};
