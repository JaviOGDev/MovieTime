import { useContext, useEffect, useState } from "react";
import { Filmcard } from "../Filmcard/Filmcard";
import "./MovieDetails.css";
import { getCast } from "../../api/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { addContent, getUserContent } from "../../firebase/firebaseOperation";

export function MovieDetails({ data, type }) {
  const [cast, setCast] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [isAdded, setIsAdded] = useState(false);

  // Function to check movie is already added
  const checkIfAdded = async () => {
    if (currentUser) {
      try {
        const userContent = await getUserContent(currentUser.uid);
        const isMovieAdded = userContent.some((movie) => movie.id === data.id);
        console.log("isMovieAdded? ", isMovieAdded);
        setIsAdded(isMovieAdded);
      } catch (error) {
        console.error("Error al verificar el contenido del usuario:", error);
      }
    }
  };
  // Get cast of movie and check if movie is already added
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCast = await getCast(type, data.id);
      setCast(fetchedCast.cast.slice(0, 10));
    };
    fetchData();
    checkIfAdded();
  }, [data]);

  // Function to add movie
  const handleAddContent = async () => {
    // If it was already added, do nothing
    if (isAdded) {
      console.log("La película ya ha sido añadida");
      return;
    }
    // By default it will be not viewed and not favou
    const content = {
      id: data.id,
      title: data.title,
      type: type,
      imageUrl: data.poster_path,
      viewed: false,
      favourited: false,
    };
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
    checkIfAdded();
  };

  return (
    <div className="movieDetailDesign">
      <div className="movieMainDesign">
        <div className="movieImgDesign">
          <img
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={`Poster of ${data.title}`}
          />
          {currentUser && (
            <span
              className="addListButton material-icons"
              onClick={handleAddContent}
            >
              {isAdded ? "done" : "add_circle_outline"}
            </span>
          )}
        </div>
        <div className="movieDetailInfoDesign">
          <div className="infoDesign">
            <h1>Title: </h1>
            <h1>{data.title}</h1>
          </div>
          <div className="infoDesign">
            <h1>Genres</h1>
            <div className="genresContainer">
              {data.genres.map((genre) => (
                <p key={genre.id}>{`${genre.name},`}</p>
              ))}
            </div>
          </div>
          <div className="infoDesign">
            <h1>Release Date: </h1>
            <h1>{data.release_date}</h1>
          </div>
          <div className="infoDesign">
            <h1>Score: </h1>
            <h1>{data.vote_average.toFixed(2)}</h1>
          </div>
          <div className="infoDesign">
            <h1>OverView: </h1>
            <h1> {data.overview}</h1>
          </div>
        </div>
      </div>
      <div className="gridContainerDesign">
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
