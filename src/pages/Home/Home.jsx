import "./Home.css";
import { Mainfilm } from "../../common/Mainfilm/Mainfilm";
import { Filmcard } from "../../common/Filmcard/Filmcard";
import { useRef } from "react";

export function Home() {
  return (
    <div className="homeDesign">
      <div>
        <Mainfilm />
      </div>
      <div className="flex items-center">
        <Filmcard />
        <Filmcard />
      </div>
    </div>
  );
}
