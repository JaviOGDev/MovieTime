const API_KEY = "16f7bcc4c99ac0b29a5f5c68815f9fdb";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchWithApiKey = async (url) => {
  const fullUrl = `${BASE_URL}${url}?api_key=${API_KEY}`;
  return fetch(fullUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Http Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.results)
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
