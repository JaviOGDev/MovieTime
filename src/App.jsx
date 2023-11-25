import "./App.css";
import { useContext } from "react";
import { Header } from "./common/Header/Header";
import { Body } from "./pages/Body/Body";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundColor: theme === "light" ? "white" : "black",
    color: theme === "light" ? "black" : "white",
  };

  return (
    <div style={style} className="app">
      <Header />
      <Body />
    </div>
  );
}

export default App;
