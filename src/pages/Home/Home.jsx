import "./Home.css";
import { MainFilmCard } from "../../common/Mainfilm/MainFilmCard";
import { Filmcard } from "../../common/Filmcard/Filmcard";
import { useEffect, useState } from "react";
import { getPopularMovies, getPopularTVShows } from "../../api/apiCalls";

export function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const scrollContainer = (direction) => {
    // Aquí implementarías la lógica para desplazar el contenedor
    // Puedes usar scrollLeft y scrollWidth para ajustar la posición
    const container = document.getElementById("filmcards-container");
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMovies = await getPopularMovies();
      const fetchedShow = await getPopularTVShows();
      setMovies(fetchedMovies.results);
      setSeries(fetchedShow.results);
    };

    fetchData();
  }, []);

  return (
    <div className="homeDesign">
      <div>
        <MainFilmCard />
      </div>
      <div>
        <h1>Pelis Populares</h1>
        <div className="filmcards-scroll-container">
          <button onClick={() => scrollContainer("left")}>{"<"}</button>
          <div id="filmcards-container" className="filmcards-container">
            {movies.length > 0 &&
              movies.map((movie) => (
                <Filmcard
                  key={movie.id}
                  title={movie.title}
                  imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                />
              ))}
          </div>
          <button onClick={() => scrollContainer("right")}>{">"}</button>
        </div>
      </div>
    </div>
  );
}
