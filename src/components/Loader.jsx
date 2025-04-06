function Loader() {
   return (
      <div style={styles.loader}>
         <div style={styles.spinner}></div>
         <p>Chargement...</p>
      </div>
   );
}

const styles = {
   loader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
   },
   spinner: {
      width: "50px",
      height: "50px",
      border: "5px solid #f3f3f3",
      borderTop: "5px solid #007bff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
   },
   "@keyframes spin": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
   },
};

export default Loader;
