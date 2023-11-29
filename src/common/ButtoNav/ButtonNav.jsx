import "./ButtonNav.css";
import { useNavigate } from "react-router-dom";

export function ButtonNav({ destination, name }) {
  //TODO: Hacer if para destination, si le llega esta el onclick y si no esta, no

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(destination);
  };

  return (
    // <div className="buttonNavDesign" onClick={handleClick}>
    <div
      onClick={handleClick}
      className="bg-gray-900 hover:bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium"
    >
      {name}
    </div>
  );
}
