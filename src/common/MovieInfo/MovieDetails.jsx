import { useContext, useEffect, useState } from "react";
import { Filmcard } from "../Filmcard/Filmcard";
import "./MovieDetails.css";
import { getCast } from "../../api/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { addContent } from "../../firebase/firebaseOperation";

export function MovieDetails({ data, type }) {
  const [cast, setCast] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const handleAddContent = async () => {
    const content = { title: data.title, type: type };

    if (currentUser) {
      try {
        await addContent(currentUser.uid, content);
        console.log(
          `Contenido '${content.title}' añadido al array del usuario ${currentUser.uid}`
        );
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

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCast = await getCast(type, data.id);
      setCast(fetchedCast.cast.slice(0, 10));
    };
    fetchData();
  }, [data]);

  return (
    <div className="movieDetailDesign">
      <div className="movieMainDesign">
        <div className="movieImgDesign">
          <img
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={`Poster of ${data.title}`}
          />
          {currentUser && (
            <button className="addListButton" onClick={handleAddContent}>
              Add to your list
            </button>
          )}
        </div>
        <div className="movieDetailInfoDesign">
          <h1>{data.title}</h1>
          <div className="genresContainer">
            {data.genres.map((genre) => (
              <p key={genre.id}>{`${genre.name},`}</p>
            ))}
          </div>
          <h1>{`Released: ${data.release_date}`}</h1>
          <h1>{`Score: ${data.vote_average}`}</h1>
          <h1> {data.overview}</h1>
        </div>
      </div>
      <div className="gridContainerDesign">
        <h1>Cast</h1>
        <div className="gridCastDesign">
          {cast.length > 0 ? (
            cast.map((cast) => {
              return (
                <Filmcard
                  key={cast.id}
                  title={cast.name}
                  imageUrl={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                />
              );
            })
          ) : (
            <p>No se ha encontrado cast</p>
          )}
        </div>
      </div>
    </div>
  );
}
