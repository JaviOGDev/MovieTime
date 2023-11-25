import "./UserTest.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addContent } from "../../firebase/firebaseOperation";

export function UserTest() {
  const [content, setContent] = useState({ title: "", type: "Movie" });
  const { currentUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent((prevContent) => ({ ...prevContent, [name]: value }));
  };

  const handleAddContent = async () => {
    if (currentUser) {
      try {
        await addContent(currentUser.uid, content);
        console.log(
          `Contenido '${content.title}' añadido al array del usuario ${currentUser.uid}`
        );
        setContent({ title: "", type: "Movie" }); // Resetea el contenido después de agregar
      } catch (error) {
        console.error(
          "Error al agregar contenido al array del usuario:",
          error
        );
      }
    } else {
      console.log("Usuario no autenticado");
    }
  };

  return (
    <div className="userTestDesign">
      <h1>Añadir Contenido</h1>
      {currentUser && (
        <div>
          <input
            type="text"
            placeholder="Título del contenido"
            name="title"
            value={content.title}
            onChange={handleInputChange}
          />
          <select name="type" value={content.type} onChange={handleInputChange}>
            <option value="Movie">Película</option>
            <option value="Serie">Serie</option>
          </select>
          <button onClick={handleAddContent}>Agregar Contenido</button>
        </div>
      )}
    </div>
  );
}
