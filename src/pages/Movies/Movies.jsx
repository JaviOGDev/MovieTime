import "./Movies.css";
import { useContext, useEffect, useState } from "react";
import { SearchResultContext } from "../../context/SearchResultContext";
import { Filmcard } from "../../common/Filmcard/Filmcard";
import { useNavigate } from "react-router-dom";

export function Movies() {
  const { searchResult } = useContext(SearchResultContext);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOder] = useState("alphabetical");
  const [changeView, setChangeView] = useState(true);
  const navigate = useNavigate();

  const filteredResults = searchResult.filter(
    (item) => filter === "all" || item.type === filter
  );

  const sortedResults = [...filteredResults].sort((a, b) => {
    const titleA = a.type === "movie" ? a.title : a.name;
    const titleB = b.type === "movie" ? b.title : b.name;

    switch (sortOrder) {
      case "alphabetical":
        return titleA.localeCompare(titleB);
      case "reverse":
        return titleB.localeCompare(titleA);
      case "ratingHighToLow":
        return b.vote_average - a.vote_average;
      case "ratingLowToHigh":
        return a.vote_average - b.vote_average;
      default:
        return 0;
    }
  });

  return (
    <div className="resultsDesign">
      <div className="filterContainerDesign">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("movie")}
          className={filter === "movie" ? "active" : ""}
        >
          Films
        </button>
        <button
          onClick={() => setFilter("serie")}
          className={filter === "serie" ? "active" : ""}
        >
          TvShows
        </button>
        <select onChange={(e) => setSortOder(e.target.value)}>
          <option value="alphabetical">Sort Alphabet</option>
          <option value="reverse">Reverse Alphabet</option>
          <option value="ratingHighToLow">Best qualified</option>
          <option value="ratingLowToHigh">Worst qualified</option>
        </select>
        <button
          onClick={() => setChangeView((prevState) => !prevState)}
          className="material-icons"
        >
          {changeView ? "list" : "grid_on"}
        </button>
      </div>
      <div className="container">
        {changeView ? (
          <div className="resultsContainerDesign">
            {sortedResults?.length > 0 ? (
              <div className="gridResultsDesign">
                {sortedResults.map((movie) => (
                  <div key={movie.id} className="filmResultCard">
                    <Filmcard
                      // title={movie.type === "movie" ? movie.title : movie.name}
                      title={movie.vote_average.toFixed(1)}
                      imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      destination={
                        movie.type === "movie"
                          ? `/movie/${movie.id}`
                          : `/tv/${movie.id}`
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>Realiza una búsqueda</p>
            )}
          </div>
        ) : (
          <div className="resultsContainerDesign">
            {sortedResults?.length > 0 ? (
              <div className="listResultsDesign">
                {sortedResults.map((movie, index) => (
                  <div
                    key={movie.id}
                    className="listResultCard"
                    onClick={() =>
                      navigate(
                        movie.type === "movie"
                          ? `/movie/${movie.id}`
                          : `/tv/${movie.id}`
                      )
                    }
                  >
                    <span className="listIndex">{index + 1}.</span>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="listPoster"
                    />
                    <div className="listDetails">
                      <h3>
                        {movie.title || movie.name} (
                        {new Date(
                          movie.release_date || movie.first_air_date
                        ).getFullYear()}
                        )
                      </h3>
                      <p className="listSubdetails">{movie.overview}</p>
                    </div>
                    <div className="listRating">
                      <h3>{movie.vote_average.toFixed(1)}</h3>
                      <p>{movie.vote_count}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Realiza una búsqueda</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
