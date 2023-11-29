import "./Home.css";
import { MainFilmCard } from "../../common/Mainfilm/MainFilmCard";
import { Filmcard } from "../../common/Filmcard/Filmcard";
import { useEffect, useState } from "react";
import { getPopularMovies, getPopularTVShows } from "../../api/apiCalls";

export function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  //Peliculas scroll
  const scrollContainerMovies = (direction) => {
    // Aquí implementarías la lógica para desplazar el contenedor
    // Puedes usar scrollLeft y scrollWidth para ajustar la posición
    const container = document.getElementById("filmcards-container-films");
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };
  //Series scroll
  const scrollContainerSeries = (direction) => {
    // Aquí implementarías la lógica para desplazar el contenedor
    // Puedes usar scrollLeft y scrollWidth para ajustar la posición
    const container = document.getElementById("filmcards-container-series");
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
          <button onClick={() => scrollContainerMovies("left")}>{"<"}</button>
          <div id="filmcards-container-films" className="filmcards-container">
            {movies.length > 0 &&
              movies.map((movie) => (
                <Filmcard
                  key={movie.id}
                  title={movie.title}
                  imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  destination={`/movie/${movie.id}`}
                />
              ))}
          </div>
          <button onClick={() => scrollContainerMovies("right")}>{">"}</button>
        </div>
      </div>
      <div>
        <h1>Series Populares</h1>
        <div className="filmcards-scroll-container">
          <button onClick={() => scrollContainerSeries("left")}>{"<"}</button>
          <div id="filmcards-container-series" className="filmcards-container">
            {series.length > 0 &&
              series.map((serie) => (
                <Filmcard
                  key={serie.id}
                  title={serie.title}
                  imageUrl={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                  destination={`/tv/${serie.id}`}
                />
              ))}
          </div>
          <button onClick={() => scrollContainerSeries("right")}>{">"}</button>
        </div>
      </div>
    </div>
  );
}
