import { useNavigate } from "react-router-dom";
import "./Filmcard.css";

export function Filmcard({ title, imageUrl, destination }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(destination);
  };

  return (
    <div className="filmcard-container">
      <div
        className="filmcard-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
        onClick={handleClick}
      />
      <div className="filmcard-title">{title}</div>
    </div>
  );
}
