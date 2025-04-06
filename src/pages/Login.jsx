import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const schema = z.object({
   email: z.string().email("Email invalide"),
   password: z
      .string()
      .min(8, "Le mot de passe doit avoir au moins 8 caractères"),
});

function Login() {
   const [error, setError] = useState("");
   const navigate = useNavigate();
   const { login } = useContext(AuthContext);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(schema),
   });

   const onSubmit = async (data) => {
      try {
         const res = await axios.post("http://localhost:3002/auth/login", data);
         if (res.status === 200) {
            login(res.data.token); // Sauvegarde du JWT dans le contexte et localStorage
            navigate("/"); // Redirection vers la page d'accueil
         }
      } catch (err) {
         setError("Email ou mot de passe incorrect");
      }
   };

   return (
      <div style={styles.container}>
         <h1>Se connecter</h1>
         <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <div style={styles.inputGroup}>
               <label htmlFor="email">Email</label>
               <input id="email" {...register("email")} />
               {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div style={styles.inputGroup}>
               <label htmlFor="password">Mot de passe</label>
               <input type="password" id="password" {...register("password")} />
               {errors.password && <span>{errors.password.message}</span>}
            </div>

            {error && <div style={styles.error}>{error}</div>}
            <button type="submit" style={styles.button}>
               Se connecter
            </button>
         </form>
      </div>
   );
}

const styles = {
   container: {
      width: "300px",
      margin: "0 auto",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
   },
   form: {
      display: "flex",
      flexDirection: "column",
   },
   inputGroup: {
      marginBottom: "10px",
   },
   button: {
      padding: "0.8rem",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
   },
   error: {
      color: "red",
      marginBottom: "10px",
   },
};

export default Login;
