import { Filmcard } from "../Filmcard/Filmcard";
import "./MovieDetails.css";

export function MovieDetails() {
  return (
    <div className="movieDetailDesign">
      <div className="movieMainDesign">
        <div className="movieImgDesign">
          <img
            src="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            alt="El poster the el Joker"
          />
        </div>

        <div className="movieDetailInfoDesign">
          <h1>Joker</h1>
          <h1>Crimen, Drama, Thriller</h1>
          <h1>Fecha: 2019-10-01</h1>
          <h1>Puntuacion: 8.165</h1>
          <h1>
            "During the 1980s, a failed stand-up comedian is driven insane and
            turns to a life of crime and chaos in Gotham City while becoming an
            infamous psychopathic crime figure.
          </h1>
        </div>
      </div>
      <div className="gridContainerDesign">
        <h1>Cast</h1>
        <div className="gridCastDesign">
          <Filmcard
            title={"Joaquin Phoenix"}
            imageUrl={
              "https://image.tmdb.org/t/p/original/oe0ydnDvQJCTbAb2r5E1asVXoCP.jpg"
            }
          />
          <Filmcard
            title={"Joaquin Phoenix"}
            imageUrl={
              "https://image.tmdb.org/t/p/original/oe0ydnDvQJCTbAb2r5E1asVXoCP.jpg"
            }
          />
          <Filmcard
            title={"Joaquin Phoenix"}
            imageUrl={
              "https://image.tmdb.org/t/p/original/oe0ydnDvQJCTbAb2r5E1asVXoCP.jpg"
            }
          />
          <Filmcard
            title={"Joaquin Phoenix"}
            imageUrl={
              "https://image.tmdb.org/t/p/original/oe0ydnDvQJCTbAb2r5E1asVXoCP.jpg"
            }
          />
          <Filmcard
            title={"Joaquin Phoenix"}
            imageUrl={
              "https://image.tmdb.org/t/p/original/oe0ydnDvQJCTbAb2r5E1asVXoCP.jpg"
            }
          />
        </div>
      </div>
    </div>
  );
}
