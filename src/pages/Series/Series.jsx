import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  clearAllContent,
  deleteContent,
  getUserContent,
} from "../../firebase/firebaseOperation";

export function Series() {
  const [contents, setContents] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserContents = async () => {
      if (currentUser) {
        try {
          const userContents = await getUserContent(currentUser.uid);
          setContents(userContents);
        } catch (error) {
          console.error("Error al obtener el contenido del usuario:", error);
        }
      }
    };

    fetchUserContents();
  }, [currentUser]);

  const handleDeleteContent = async (contentToDelete) => {
    if (currentUser) {
      try {
        await deleteContent(currentUser.uid, contentToDelete);
        setContents(contents.filter((content) => content !== contentToDelete));
      } catch (error) {
        console.error("Error al eliminar el contenido:", error);
      }
    }
  };

  const handleClearAll = async () => {
    if (currentUser) {
      try {
        await clearAllContent(currentUser.uid);
        setContents([]); // Actualiza el estado para reflejar el cambio en la interfaz de usuario
      } catch (error) {
        console.error("Error al limpiar todo el contenido:", error);
      }
    }
  };

  return (
    <>
      <h1>Contenido</h1>
      <div>
        {contents.length > 0 ? (
          contents.map((content, index) => (
            <div key={index}>
              <p>
                {content.title} ({content.type})
                <button onClick={() => handleDeleteContent(content)}>
                  Eliminar
                </button>
              </p>
            </div>
          ))
        ) : (
          <p>No hay contenido para mostrar.</p>
        )}
        {contents.length > 0 && (
          <button onClick={handleClearAll}>Clear All</button>
        )}
      </div>
    </>
  );
}
