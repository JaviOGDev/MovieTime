import "./App.css";
import { useContext } from "react";
import { Header } from "./common/Header/Header";
import { Body } from "./pages/Body/Body";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);

  // const style = {
  //   backgroundColor: theme === "light" ? "white" : "black",
  //   color: theme === "light" ? "black" : "white",
  // };

  const themeClass =
    theme === "light" ? "bg-green-200 text-black" : "bg-orange-200 text-white";

  return (
    // <div style={style} className="app">
    <div className={themeClass + " app"}>
      <Header />
      <Body />
    </div>
  );
}

export default App;
