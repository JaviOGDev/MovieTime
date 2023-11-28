import "./App.css";
import { useContext } from "react";
import { Header } from "./common/Header/Header";
import { Body } from "./pages/Body/Body";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundColor: theme === "light" ? "white" : "#141414",
    color: theme === "light" ? "black" : "white",
  };

  console.log(style);

  // const themeClass =
  //   theme === "light" ? "bg-green-200 text-black" : "bg-orange-200 text-white";

  return (
    // <div className={themeClass + " app"}>
    <div style={style} className="app">
      <Header />
      <Body />
    </div>
  );
}

export default App;
