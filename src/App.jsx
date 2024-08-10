import { useState, useEffect } from "react";
import wheresWaldo from "../src/assets/925901.jpg";
import Nav from "./components/Nav";
import Dropdown from "./components/Dropdown";
import Targetbox from "./components/Targetbox";
import { createUser, checkCoordinates, updateUser } from "./lib/service";
import "./App.css";

// when a coordiante is selected, it needs to be compared with the general hitbox
// hitbox should be 15x15 pixels for initial testing, to be increased in case the user experience is not good.
// if the hitbox is too small, user experience will suffer

// on click the dropdown needs to appear. Dropdown will be positioned absolutely to appear over things.
// the dropdown menu needs to be placed relative to the cursor, hence for this we can use e.clientX, e.clientY

function App() {
  const [userId, setUserId] = useState();
  const [coordinates, setCoordinate] = useState([0, 0]);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [dropdownX, setdropdownX] = useState("0px");
  const [dropdownY, setDropdownY] = useState("0px");
  const [showTarget, setShowTarget] = useState(false);
  const [targetX, setTargetX] = useState("0px");
  const [targetY, setTargetY] = useState("0px");
  const [startCount, setStartCount] = useState(false);
  let [counter, setCounter] = useState(0);

  // on click gets coordinates of click
  // this is kinda ugly and big, and does way too many things,
  // however, I'm not sure best way of splitting it up since many things occur on one click
  const showCoord = async (e) => {
    console.log(document.documentElement.scrollLeft);
    const xcoord = e.nativeEvent.offsetX;
    const ycoord = e.nativeEvent.offsetY;
    const absoluteX = e.clientX + document.documentElement.scrollLeft;
    const absoluteY = e.clientY + document.documentElement.scrollTop;
    setDropdownShow(!dropdownShow);
    console.log(xcoord + `,` + ycoord);
    setCoordinate([xcoord, ycoord]);
    setShowTarget(!showTarget);
    // sharing same values? maybe can do it in a shared state instead?
    // refactor
    setdropdownX(absoluteX);
    setDropdownY(absoluteY);
    setTargetX(absoluteX);
    setTargetY(absoluteY);
    const coordResult = await checkCoordinates(xcoord, ycoord);
    // coords returned do not match any of the image coords
    if (!coordResult) {
      return console.log("bad result");
    }
    // coords match, need to update user table
    const updateResult = await updateUser(coordResult, userId);
    // TO DO: Add check to se if 3/3 items have been found
    console.log(updateResult);
  };

  // game start
  const gameStartHandler = async () => {
    // setStartCount(!startCount);
    const newUser = await createUser();
    setUserId(newUser.id);
  };

  // use effect for showing local counter, additional timer required on backend side to make sure timer cannot be manipulated
  useEffect(() => {
    if (startCount === true) {
      const key = setInterval(() => {
        setCounter((counter) => counter + 1);
      }, 100);

      // cleanup function to stop the timer going crazy
      return () => clearInterval(key);
    }
  }, [startCount]);

  return (
    <>
      <button onClick={gameStartHandler}>Start game</button>
      <p>{counter / 10}</p>
      <Targetbox targetshow={showTarget} targetX={targetX} targetY={targetY} />
      <Dropdown
        dropdown={dropdownShow}
        dropdownX={dropdownX}
        dropdownY={dropdownY}
      />
      <div className="mainContent">
        <div className="header">
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
