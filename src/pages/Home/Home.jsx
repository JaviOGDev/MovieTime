import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export function Home() {
  const [movieTitle, setMovieTitle] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleAddMovie = async () => {
    if (currentUser) {
      try {
        // Añadir película a Firestore
        await addDoc(collection(db, "movies"), {
          title: movieTitle,
          userId: currentUser.uid,
          timestamp: new Date(),
        });
        console.log(
          `Película '${movieTitle}' añadida para el usuario ${currentUser.uid}`
        );
        setMovieTitle(""); // Resetea el título después de agregar
      } catch (error) {
        console.error("Error al agregar película:", error);
      }
    } else {
      console.log("Usuario no autenticado");
    }
  };

  return (
    <div className="homeDesign">
      <h1>Home</h1>
      {currentUser && (
        <div>
          <input
            type="text"
            placeholder="Título de la película"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <button onClick={handleAddMovie}>Agregar Película</button>
        </div>
      )}
      <ul>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
      </ul>
    </div>
  );
}
