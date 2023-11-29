import "./Body.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Series } from "../Series/Series";
import { UserTest } from "../UserTest/UserTest";
import { Movies } from "../Movies/Movies";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { MovieInfo } from "../MovieInfo/MovieInfo";

export function Body() {
  const { theme } = useContext(ThemeContext);
  const style = {
    backgroundColor: theme === "light" ? "white" : "#141414",
    color: theme === "light" ? "black" : "white",
  };

  return (
    <div style={style} className="bodyDesign">
      <Routes>
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/usertest" element={<UserTest />} />
        <Route path="/:type/:id" element={<MovieInfo />} />
      </Routes>
    </div>
  );
}
