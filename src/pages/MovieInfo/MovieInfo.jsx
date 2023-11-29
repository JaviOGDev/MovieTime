import "./MovieInfo.css";
import { MovieDetails } from "../../common/MovieInfo/MovieDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetails } from "../../api/apiCalls";

export function MovieInfo() {
  const { type, id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    console.log(type);
    console.log(id);

    const fetchData = async () => {
      const response = await getDetails(type, id);
      console.log(response);
      setData(response);
    };

    fetchData();
  }, [type, id]);

  return (
    <div className="movieInfoDesign">
      {data ? <p>{data.title || data.name}</p> : <p>Cargando</p>}
      <MovieDetails />
    </div>
  );
}
