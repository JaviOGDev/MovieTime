import { useNavigate } from "react-router-dom";
import "./MainFilmCard.css";

export function MainFilmCard({ id, wallpaper }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      className="mainfilm-container"
      style={{
        backgroundImage: `url(${wallpaper})`,
      }}
    >
      <button className="info-button" onClick={handleClick}>
        Mas info
      </button>
    </div>
  );
}
