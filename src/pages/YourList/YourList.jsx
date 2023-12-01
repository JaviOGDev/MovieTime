import "./YourList.css";
import { useContext, useEffect, useState } from "react";
import { Filmcard } from "../../common/Filmcard/Filmcard";
import { AuthContext } from "../../context/AuthContext";
import {
  getUserContent,
  toggleMovieFavouritedStatus,
  toggleMovieViewedStatus,
} from "../../firebase/firebaseOperation";

export function YourList() {
  const [list, setList] = useState([]);
  const [pendingMovies, setPendingMovies] = useState([]);
  const [viewedMovies, setViewedMovies] = useState([]);
  const [favouritedMovies, setFavouritedMovies] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const [refresh, setRefresh] = useState("false");

  // Función para manejar el cambio de estado de "viewed"
  const handleToggleViewed = async (movieId) => {
    try {
      await toggleMovieViewedStatus(currentUser.uid, movieId);
      setRefresh(true);
    } catch (error) {
      console.error("Error al cambiar el estado de 'viewed'", error);
    }
  };

  // Función para manejar el cambio de estado de "favourited"
  const handleToggleFavourited = async (movieId) => {
    try {
      await toggleMovieFavouritedStatus(currentUser.uid, movieId);
      setRefresh(true);
    } catch (error) {
      console.error("Error al cambiar el estado de 'favourited'", error);
    }
  };

  useEffect(() => {
    setRefresh(false);
    const fetchUserContents = async () => {
      if (currentUser) {
        try {
          const userContents = await getUserContent(currentUser.uid);
          console.log("Todas las peliculas: ", userContents);
          setList(userContents);

          setPendingMovies(userContents.filter((movie) => !movie.viewed));
          setViewedMovies(userContents.filter((movie) => movie.viewed));
          setFavouritedMovies(userContents.filter((movie) => movie.favourited));
        } catch (error) {
          console.log("Error al obtener peliculas del usuario.", error);
        }
      }
      console.log("Pending movies: ", pendingMovies);
      console.log("Viewed movies: ", viewedMovies);
      console.log("Favourited movies: ", favouritedMovies);
    };

    fetchUserContents();
  }, [currentUser, refresh]);

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
                      Add fav
                    </button>
                    <button>Delete</button>
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
                      Add fav
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
