import "./Home.css";
import { MainFilmCard } from "../../common/Mainfilm/MainFilmCard";
import { Filmcard } from "../../common/Filmcard/Filmcard";
import { useEffect, useState } from "react";
import { getPopularMovies, getPopularTVShows } from "../../api/apiCalls";

export function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [homeFilm, setHomeFilm] = useState();

  //Peliculas scroll
  const scrollContainerMovies = (direction) => {
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
      setHomeFilm(fetchedMovies.results[0]);
    };

    fetchData();
  }, []);

  return (
    <div className="homeDesign">
      <div>
        <MainFilmCard
          id={homeFilm ? homeFilm.id : "0"}
          wallpaper={
            homeFilm
              ? `https://image.tmdb.org/t/p/original${homeFilm.backdrop_path}`
              : "https://image.tmdb.org/t/p/original/zIYROrkHJPYB3VTiW1L9QVgaQO.jpg"
          }
        />
      </div>
      <div>
        <h1 className="title-home">Popular Films</h1>
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
        <h1 className="title-home">Popular TvShows</h1>
        <div className="filmcards-scroll-container">
          <button onClick={() => scrollContainerSeries("left")}>{"<"}</button>
          <div id="filmcards-container-series" className="filmcards-container">
            {series.length > 0 &&
              series.map((serie) => (
                <Filmcard
                  key={serie.id}
                  title={serie.name}
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
