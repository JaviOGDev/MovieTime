import "./Home.css";
import { MainFilmCard } from "../../common/Mainfilm/MainFilmCard";
import { Filmcard } from "../../common/Filmcard/Filmcard";
import { useEffect, useState } from "react";
import { getPopularMovies, getPopularTVShows } from "../../api/apiCalls";
import { Footer } from "../../common/Footer/Footer";

export function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

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

  const scrollContainerSeries = (direction) => {
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
      setMovies(fetchedMovies);
      setSeries(fetchedShow);
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
          <div id="filmcards-containers-series" className="filmcards-container">
            {series.length > 0 &&
              series.map((serie) => (
                <Filmcard
                  key={serie.id}
                  title={serie.title}
                  imageUrl={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                />
              ))}
          </div>
          <button onClick={() => scrollContainerMovies("right")}>{">"}</button>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
