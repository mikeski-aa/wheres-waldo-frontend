import { useState } from "react";
import wheresWaldo from "../src/assets/925901.jpg";
import Nav from "./components/Nav";
import Dropdown from "./components/Dropdown";
import Targetbox from "./components/Targetbox";
import "./App.css";

// when a coordiante is selected, it needs to be compared with the general hitbox
// hitbox should be 15x15 pixels for initial testing, to be increased in case the user experience is not good.
// if the hitbox is too small, user experience will suffer

// on click the dropdown needs to appear. Dropdown will be positioned absolutely to appear over things.
// the dropdown menu needs to be placed relative to the cursor, hence for this we can use e.clientX, e.clientY

function App() {
  const [coordinates, setCoordinate] = useState([0, 0]);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [dropdownX, setdropdownX] = useState("0px");
  const [dropdownY, setDropdownY] = useState("0px");
  const [showTarget, setShowTarget] = useState(false);
  const [targetX, setTargetX] = useState("0px");
  const [targetY, setTargetY] = useState("0px");

  // on click gets coordinates of click
  const showCoord = (e) => {
    console.log(document.documentElement.scrollLeft);
    const xcoord = e.nativeEvent.offsetX;
    const ycoord = e.nativeEvent.offsetY;
    setCoordinate([xcoord, ycoord]);
    const absoluteX = e.clientX + document.documentElement.scrollLeft;
    const absoluteY = e.clientY + document.documentElement.scrollTop;
    setDropdownShow(!dropdownShow);
    setShowTarget(!showTarget);
    setdropdownX(absoluteX);
    setDropdownY(absoluteY);
    setTargetX(absoluteX);
    setTargetY(absoluteY);
  };

  return (
    <>
      <Targetbox targetshow={showTarget} targetX={targetX} targetY={targetY} />
      <Dropdown
        dropdown={dropdownShow}
        dropdownX={dropdownX}
        dropdownY={dropdownY}
      />
      <div className="mainContent">
        <div className="header">
          <div>LOGO</div>
          <Nav />
        </div>

        <div className="gameArea" width={1700}>
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
