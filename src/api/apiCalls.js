const API_KEY = "16f7bcc4c99ac0b29a5f5c68815f9fdb";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchWithApiKey = async (url) => {
  // searchMoviesAndTVShows already uses ?, it'll be /search/movie?query=Shrek&api_key
  const separator = url.includes("?") ? "&" : "?";

  const fullUrl = `${BASE_URL}${url}${separator}api_key=${API_KEY}`;
  return fetch(fullUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Http Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

// Obtains most popular movies
export const getPopularMovies = () => {
  return fetchWithApiKey("/movie/popular");
};

// // Obtains most popular series
export const getPopularTVShows = () => {
  return fetchWithApiKey("/tv/popular");
};

// Gets details of serie/movie, needs type and id
export const getDetails = (type, id) => {
  return fetchWithApiKey(`/${type}/${id}`);
};
// Gets cast of serie/movie, needs type and id
export const getCast = (type, movieId) => {
  return fetchWithApiKey(`/${type}/${movieId}/credits`);
};

// Obtains movies and series of a name
export const searchMoviesAndTVShows = async (query) => {
  // Getting movies
  const moviesPromise = fetchWithApiKey(`/search/movie?query=${query}`);
  // Getting series
  const seriesPromise = fetchWithApiKey(`/search/tv?query=${query}`);
  // Wait both complete, modifie both with extra property "type"
  return Promise.all([moviesPromise, seriesPromise])
    .then(([moviesPromise, seriesPromise]) => {
      const newMoviesPromise = moviesPromise.results.map((movie) => ({
        ...movie,
        type: "movie",
      }));
      const newSeriesPromise = seriesPromise.results.map((serie) => ({
        ...serie,
        type: "serie",
      }));

      return [...newMoviesPromise, ...newSeriesPromise];
    })
    .catch((error) => {
      console.error("Search error:", error);
    });
};
