import { useState, useEffect } from "react";
import wheresWaldo from "../src/assets/925901.jpg";
import Nav from "./components/Nav";
import Dropdown from "./components/Dropdown";
import Targetbox from "./components/Targetbox";
import { createUser } from "./lib/service";
import "./App.css";
import EndGameModal from "./components/EndGameModal";
import StartGameModal from "./components/StartGameModal";
import ConfirmBox from "./components/ConfirmTarget";
import Logo from "./components/Logo";
import Targets from "./components/Targets";
import LeaderboardsModal from "./components/LeaderboardsModal";

// when a coordiante is selected, it needs to be compared with the general hitbox
// hitbox should be 16x16 pixels for initial testing, to be increased in case the user experience is not good.
// if the hitbox is too small, user experience will suffer

// on click the dropdown needs to appear. Dropdown will be positioned absolutely/fixed to appear over things.
// the dropdown menu needs to be placed relative to the cursor, hence for this we can use e.clientX, e.clientY

function App() {
  const [userId, setUserId] = useState();
  const [dbFinalTime, setdbFinalTime] = useState(0);
  const [coordinates, setCoordinate] = useState([0, 0]);
  const [absoluteCoords, setAbsoluteCoords] = useState([0, 0]);
  const [confirmOne, setConfirmOne] = useState([false, 0, 0]);
  const [confirmTwo, setConfirmTwo] = useState([false, 0, 0]);
  const [confirmThree, setConfirmThree] = useState([false, 0, 0]);
  const [gameStart, setGameStart] = useState(false);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [endGameModal, setEndGameModal] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [startCount, setStartCount] = useState(false);
  const [leaderboardModal, setLeaderboardModal] = useState(false);
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

  // game start, creates a new user and enables the play area
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
      <LeaderboardsModal
        show={leaderboardModal}
        setShow={setLeaderboardModal}
      />
      <Logo />
      <EndGameModal
        visibility={endGameModal}
        finaltime={dbFinalTime}
        userid={userId}
      />
      <Targetbox
        targetshow={showTarget}
        coords={absoluteCoords}
        targetnumber={0}
      />
      <ConfirmBox
        targetshow={confirmOne[0]}
        coordx={confirmOne[1]}
        coordy={confirmOne[2]}
      />

      <ConfirmBox
        targetshow={confirmTwo[0]}
        coordx={confirmTwo[1]}
        coordy={confirmTwo[2]}
      />

      <ConfirmBox
        targetshow={confirmThree[0]}
        coordx={confirmThree[1]}
        coordy={confirmThree[2]}
      />
      <Dropdown
        dropdown={dropdownShow}
        dropdowncoords={absoluteCoords}
        targetcoords={coordinates}
        setDropdown={setDropdownShow}
        userid={userId}
        setFinalTime={setdbFinalTime}
        setStartCount={setStartCount}
        setEndGameModal={setEndGameModal}
        startCount={startCount}
        endGameModal={endGameModal}
        setShowTarget={setShowTarget}
        setConfirmOne={setConfirmOne}
        setConfirmTwo={setConfirmTwo}
        setConfirmThree={setConfirmThree}
      />
      <div className="mainContent">
        <div className="header">
          <Nav setModal={setLeaderboardModal} />
          <div className={`game ${gameStart}`}>
            <h4>Time elapsed:</h4>
            <h4 className="counterTitle">{counter / 10}</h4>
            <Targets />
          </div>
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
