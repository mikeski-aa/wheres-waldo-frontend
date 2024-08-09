import { useState } from "react";
import wheresWaldo from "../src/assets/925901.jpg";
import Nav from "./components/Nav";
import "./App.css";

// when a coordiante is selected, it needs to be compared with the general hitbox
// hitbox should be 15x15 pixels for initial testing, to be increased in case the user experience is not good.
// if the hitbox is too small, user experience will suffer

function App() {
  const [coordinates, setCoordinate] = useState([0, 0]);

  // on click gets coordinates of click
  const showCoord = (e) => {
    const xcoord = e.nativeEvent.offsetX;
    const ycoord = e.nativeEvent.offsetY;
    console.log(xcoord + `,` + ycoord);
    setCoordinate([xcoord, ycoord]);
  };

  return (
    <>
      <div className="mainContent">
        <div className="header">
          <div>LOGO</div>
          <Nav />
        </div>

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
