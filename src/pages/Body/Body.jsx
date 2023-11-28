import "./Body.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Series } from "../Series/Series";
import { UserTest } from "../UserTest/UserTest";
import { Movies } from "../Movies/Movies";

export function Body() {
  return (
    <div className="bodyDesign">
      <Routes>
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/usertest" element={<UserTest />} />
      </Routes>
    </div>
  );
}
