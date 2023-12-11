import "./YourList.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { Filmcard } from "../../common/Filmcard/Filmcard";
import { AuthContext } from "../../context/AuthContext";
import {
  deleteContent,
  getUserContent,
  toggleMovieFavouritedStatus,
  toggleMovieViewedStatus,
} from "../../firebase/firebaseOperation";

export function YourList() {
  const [list, setList] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const fetchUserContents = useCallback(async () => {
    if (currentUser) {
      try {
        const userContents = await getUserContent(currentUser.uid);
        setList(userContents);
      } catch (error) {
        console.error("Error al obtener películas del usuario.", error);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUserContents();
  }, [fetchUserContents]);

  // Función para manejar el cambio de estado de "viewed"
  const handleToggleViewed = useCallback(
    async (movieId) => {
      if (!currentUser) {
        console.error("No hay usuario autenticado.");
        return;
      }
      try {
        const newState = !list.find((movie) => movie.id === movieId).viewed;
        await toggleMovieViewedStatus(currentUser.uid, movieId);
        setList((currentList) =>
          currentList.map((movie) =>
            movie.id === movieId ? { ...movie, viewed: newState } : movie
          )
        );
      } catch (error) {
        console.error("Error al cambiar el estado de 'viewed'", error);
      }
    },
    [currentUser, list]
  );
  // Función para manejar el cambio de estado de "favourited"
  const handleToggleFavourited = useCallback(
    async (movieId) => {
      if (!currentUser) {
        console.error("No hay usuario autenticado.");
        return;
      }
      try {
        const newState = !list.find((movie) => movie.id === movieId).favourited;
        console.log(newState);
        await toggleMovieFavouritedStatus(currentUser.uid, movieId);
        setList((currentList) =>
          currentList.map((movie) =>
            movie.id === movieId ? { ...movie, favourited: newState } : movie
          )
        );
      } catch (error) {
        console.error("Error al cambiar el estado de 'favourited'", error);
      }
    },
    [currentUser, list]
  );

  const handleDeleteMovie = useCallback(
    async (movie) => {
      if (!currentUser) {
        console.error("No hay usuario autenticado.");
        return;
      }
      try {
        await deleteContent(currentUser.uid, movie);
        setList((currentList) =>
          currentList.filter((item) => item.id !== movie.id)
        );
      } catch (error) {
        console.error("Error al eliminar la película", error);
      }
    },
    [currentUser]
  );

  // Filtrado de peliculas pending, viewed and favourited
  const pendingMovies = list.filter((movie) => !movie.viewed);
  const viewedMovies = list.filter((movie) => movie.viewed);
  const favouritedMovies = list.filter((movie) => movie.favourited);

  return (
    <div className="yourListDesign">
      <div className="gridMoviesContainer">
        <h1>Pending</h1>
        <div className="gridMovies">
          {pendingMovies.length > 0 ? (
            pendingMovies.map((movie) => {
              return (
                <div className="filmCardContainer" key={movie.id}>
                  <Filmcard
                    title={movie.title}
                    imageUrl={`https://image.tmdb.org/t/p/original${movie.imageUrl}`}
                  />
                  <div className="filmCardContainerButtons">
                    <button onClick={() => handleToggleViewed(movie.id)}>
                      Viewed
                    </button>
                    <button onClick={() => handleToggleFavourited(movie.id)}>
                      {movie.favourited ? "Unfav" : "Add fav"}
                    </button>
                    <button onClick={() => handleDeleteMovie(movie)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Añade peliculas - Pending</p>
          )}
        </div>
      </div>
      <div className="gridMoviesContainer">
        <h1>Viewed</h1>
        <div className="gridMovies">
          {viewedMovies.length > 0 ? (
            viewedMovies.map((movie) => {
              return (
                <div className="filmCardContainer" key={movie.id}>
                  <Filmcard
                    title={movie.title}
                    imageUrl={`https://image.tmdb.org/t/p/original${movie.imageUrl}`}
                  />
                  <div className="filmCardContainerButtons">
                    <button onClick={() => handleToggleViewed(movie.id)}>
                      Pending
                    </button>
                    <button onClick={() => handleToggleFavourited(movie.id)}>
                      {movie.favourited ? "Unfav" : "Add fav"}
                    </button>
                    <button>Delete</button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Añade peliculas - Viewed</p>
          )}
        </div>
      </div>
      <div className="gridMoviesContainer">
        <h1>Favourited</h1>
        <div className="gridMovies">
          {favouritedMovies.length > 0 ? (
            favouritedMovies.map((movie) => {
              return (
                <div className="filmCardContainer" key={movie.id}>
                  <Filmcard
                    title={movie.title}
                    imageUrl={`https://image.tmdb.org/t/p/original${movie.imageUrl}`}
                  />
                  <div className="filmCardContainerButtons">
                    <button onClick={() => handleToggleFavourited(movie.id)}>
                      Unfav
                    </button>
                    <button>Delete</button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Añade peliculas - Favourited</p>
          )}
        </div>
      </div>
    </div>
  );
}
