import "./Body.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Search } from "../Search/Search";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { MovieInfo } from "../MovieInfo/MovieInfo";
import { YourList } from "../YourList/YourList";

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
        <Route path="/search" element={<Search />} />
        <Route path="/yourlist" element={<YourList />} />
        <Route path="/:type/:id" element={<MovieInfo />} />
      </Routes>
    </div>
  );
}
