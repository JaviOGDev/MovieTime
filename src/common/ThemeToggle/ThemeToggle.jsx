import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div onClick={toggleTheme} className="theme-button">
      {/* {theme === "light" ? "Modo Oscuro" : "Modo Claro"} */}
      <span className="material-icons">
        {theme === "light" ? "dark_mode" : "light_mode"}
      </span>
    </div>
  );
}
