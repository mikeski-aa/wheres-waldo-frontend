import { useState } from "react";
import wheresWaldo from "../src/assets/925901.jpg";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [coordinates, setCoordinate] = useState([0, 0]);

  const showCoord = (e) => {
    const xcoord = e.nativeEvent.offsetX;
    const ycoord = e.nativeEvent.offsetY;
    console.log(xcoord + `,` + ycoord);
    setCoordinate([xcoord, ycoord]);
  };

  return (
    <>
      <div className="mainContent">
        <Nav />
        <div className="gameArea">
          <img
            src={wheresWaldo}
            onClick={(e) => showCoord(e)}
            width={1700}
          ></img>
        </div>
      </div>
    </>
  );
}

export default App;
