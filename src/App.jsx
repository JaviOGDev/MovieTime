import "./App.css";
import { useContext } from "react";
import { Header } from "./common/Header/Header";
import { Body } from "./pages/Body/Body";
import { ThemeContext } from "./context/ThemeContext";
import { Footer } from "./common/Footer/Footer";

function App() {
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundColor: theme === "light" ? "white" : "#141414",
    color: theme === "light" ? "black" : "white",
  };

  return (
    <div style={style} className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
