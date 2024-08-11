import { useState, useEffect } from "react";
import wheresWaldo from "../src/assets/925901.jpg";
import Nav from "./components/Nav";
import Dropdown from "./components/Dropdown";
import Targetbox from "./components/Targetbox";
import {
  createUser,
  checkCoordinates,
  updateUser,
  checkWin,
  stopTimer,
  getFinalTime,
} from "./lib/service";
import "./App.css";
import EndGameModal from "./components/EndGameModal";
import StartGameModal from "./components/StartGameModal";

// when a coordiante is selected, it needs to be compared with the general hitbox
// hitbox should be 16x16 pixels for initial testing, to be increased in case the user experience is not good.
// if the hitbox is too small, user experience will suffer

// on click the dropdown needs to appear. Dropdown will be positioned absolutely/fixed to appear over things.
// the dropdown menu needs to be placed relative to the cursor, hence for this we can use e.clientX, e.clientY

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [dbFinalTime, setdbFinalTime] = useState(0);
  const [userId, setUserId] = useState();
  const [endGameModal, setEndGameModal] = useState(false);
  const [coordinates, setCoordinate] = useState([0, 0]);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [absoluteCoords, setAbsoluteCoords] = useState([0, 0]);
  const [showTarget, setShowTarget] = useState(false);
  const [startCount, setStartCount] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState();
  const [coordCheckResult, setCoordCheckResult] = useState();
  let [counter, setCounter] = useState(0);

  // on click gets coordinates of click
  // this is kinda ugly and big, and does way too many things,
  // however, I'm not sure best way of splitting it up since many things occur on one click
  const showCoord = async (e) => {
    const xcoord = e.nativeEvent.offsetX;
    const ycoord = e.nativeEvent.offsetY;
    const absoluteX = e.clientX + document.documentElement.scrollLeft;
    const absoluteY = e.clientY + document.documentElement.scrollTop;
    setDropdownShow(true);
    setCoordinate([xcoord, ycoord]);
    setShowTarget(true);
    setAbsoluteCoords([absoluteX, absoluteY]);
  };

  // game start
  const gameStartHandler = async () => {
    const newUser = await createUser();
    setUserId(newUser.id);
    setStartCount(!startCount);
    setGameStart(true);
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
      <EndGameModal
        visibility={endGameModal}
        finaltime={dbFinalTime}
        userid={userId}
      />
      <Targetbox targetshow={showTarget} coords={absoluteCoords} />
      <Dropdown
        dropdown={dropdownShow}
        dropdowncoords={absoluteCoords}
        targetcoords={coordinates}
        setDropdown={setDropdownShow}
        setCoordCheck={setCoordCheckResult}
        userid={userId}
        setFinalTime={setdbFinalTime}
        setStartCount={setStartCount}
        setEndGameModal={setEndGameModal}
        startCount={startCount}
        endGameModal={endGameModal}
      />
      <div className="mainContent">
        <div className="header">
          <Nav />
          <h2>{counter / 10}</h2>
        </div>

        <div className="gameArea" width={1700}>
          <StartGameModal
            gamestate={gameStart}
            buttonaction={gameStartHandler}
          />
          <img
            className={`gameBoardPic ${gameStart}`}
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
