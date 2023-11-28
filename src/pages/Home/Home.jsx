import "./Home.css";
import { MainFilmCard } from "../../common/Mainfilm/MainFilmCard";
import { Filmcard } from "../../common/Filmcard/Filmcard";

export function Home() {
  const scrollContainer = (direction) => {
    // Aquí implementarías la lógica para desplazar el contenedor
    // Puedes usar scrollLeft y scrollWidth para ajustar la posición
    const container = document.getElementById("filmcards-container");
    const scrollAmount = 200; // Ajusta este valor según el tamaño de tus tarjetas
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="homeDesign">
      <div>
        <MainFilmCard />
      </div>
      <div>
        <h1>Pelis Populares</h1>
        <div className="filmcards-scroll-container">
          <button onClick={() => scrollContainer("left")}>{"<"}</button>
          <div id="filmcards-container" className="filmcards-container">
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
          </div>

          <button onClick={() => scrollContainer("right")}>{">"}</button>
        </div>
      </div>
      <div>
        <h1>Series Populares</h1>
        <div className="filmcards-scroll-container">
          <button onClick={() => scrollContainer("left")}>{"<"}</button>
          <div id="filmcards-container" className="filmcards-container">
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
            <Filmcard
              title={"Joker"}
              imageUrl="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            />
          </div>

          <button onClick={() => scrollContainer("right")}>{">"}</button>
        </div>
      </div>
    </div>
  );
}
