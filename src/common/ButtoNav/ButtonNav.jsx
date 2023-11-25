import "./ButtonNav.css";
import { useNavigate } from "react-router-dom";

export function ButtonNav({ destination, name }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(destination);
  };

  return (
    <div className="buttonNavDesign" onClick={handleClick}>
      {name}
    </div>
  );
}
