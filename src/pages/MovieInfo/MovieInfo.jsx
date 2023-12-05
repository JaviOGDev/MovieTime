import "./MovieInfo.css";
import { MovieDetails } from "../../common/MovieInfo/MovieDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetails } from "../../api/apiCalls";

export function MovieInfo() {
  const { type, id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDetails(type, id);
      if (type === "movie") {
        const responseFiltered = {
          id: response.id,
          title: response.title,
          release_date: response.release_date,
          overview: response.overview,
          vote_average: response.vote_average,
          poster_path: response.poster_path,
          genres: response.genres,
        };
        console.log(response);
        setData(responseFiltered);
      }
      if (type === "tv") {
        const responseFiltered = {
          id: response.id,
          title: response.name,
          release_date: response.first_air_date,
          overview: response.overview,
          vote_average: response.vote_average,
          poster_path: response.poster_path,
          genres: response.genres,
        };
        setData(responseFiltered);
      }
    };
    fetchData();
  }, [type, id]);

  return (
    <div className="movieInfoDesign">
      {data ? <MovieDetails data={data} type={type} /> : <p>Cargando</p>}
    </div>
  );
}
