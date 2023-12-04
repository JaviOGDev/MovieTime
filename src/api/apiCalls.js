const API_KEY = "16f7bcc4c99ac0b29a5f5c68815f9fdb";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchWithApiKey = async (url) => {
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

export const getPopularMovies = () => {
  return fetchWithApiKey("/movie/popular");
};

export const getPopularTVShows = () => {
  return fetchWithApiKey("/tv/popular");
};

export const getDetails = (type, id) => {
  return fetchWithApiKey(`/${type}/${id}`);
};

export const getCast = (type, movieId) => {
  return fetchWithApiKey(`/${type}/${movieId}/credits`);
};

//Falta testear
export const getMovies = (query) => {
  return fetchWithApiKey(`/search/movie&query=${query}`);
};

export const searchMoviesAndTVShows = async (query) => {
  const moviesPromise = fetchWithApiKey(
    `/search/movie?query=${encodeURIComponent(query)}`
  );

  const seriesPromise = fetchWithApiKey(
    `/search/tv?query=${encodeURIComponent(query)}`
  );

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
