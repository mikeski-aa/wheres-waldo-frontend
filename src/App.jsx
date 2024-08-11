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

    /////////////////////////////////////////////////////
    // main game, TO DO put it in its own function later
    /////////////////////////////////////////////////////

    const coordResult = await checkCoordinates(xcoord, ycoord);
    // coords returned do not match any of the image coords
    if (!coordResult) {
      return console.log("bad result");
    }
    // coords match, need to update user table
    const updateResult = await updateUser(coordResult, userId);
    // checking if 3 items have been found
    const winStatus = await checkWin(userId);

    if (!winStatus) {
      return console.log("continue the game, not won");
    }
    console.log(winStatus);
    // when a user won, we stop the serverside timer and local timer
    const serverTimerStop = await stopTimer(userId);
    console.log(serverTimerStop);

    // get final time it took to complete this task from when user clicked start
    const finalTime = await getFinalTime(userId);
    setdbFinalTime(finalTime);
    console.log(finalTime);
    setStartCount(!startCount);
    setEndGameModal(!endGameModal);

    // we then need to prompt the user to add their username to the leaderboard.
    // let's open a modal which displays their time, and then prompts them for their user which we will update on the leaderboards.
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
      <Targetbox targetshow={showTarget} targetX={targetX} targetY={targetY} />
      <Dropdown
        dropdown={dropdownShow}
        dropdownX={dropdownX}
        dropdownY={dropdownY}
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
