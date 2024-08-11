import "../styles/dropdown.css";
import target1 from "../assets/target1.png";
import target2 from "../assets/target2.png";
import target3 from "../assets/target3.png";
import {
  checkCoordinates,
  updateUser,
  checkWin,
  stopTimer,
  getFinalTime,
} from "../lib/service";

function Dropdown(props) {
  const dropdownx = props.dropdowncoords[0] + 15 + "px";
  const dropdowny = props.dropdowncoords[1] + "px";
  const userId = props.userid;

  // this needs to set a temp state of selected to the appropriate target value
  // on clicking an option, this box needs to close
  const handleDropdownClick = async (input) => {
    const response = await checkCoordinates(
      props.targetcoords[0],
      props.targetcoords[1],
      input
    );
    props.setDropdown(false);
    props.setShowTarget(false);

    /////////////////////////////////////////////////////
    // main game logic
    /////////////////////////////////////////////////////

    // const coordResult = await checkCoordinates(xcoord, ycoord);
    // coords returned do not match any of the image coords
    if (!response) {
      return console.log("bad result");
    }

    // simple conditional to set a green target box identifying you found one of the targets
    if (response.id === 1) {
      props.setConfirmOne([
        true,
        props.dropdowncoords[0],
        props.dropdowncoords[1],
      ]);
    } else if (response.id === 2) {
      props.setConfirmTwo([
        true,
        props.dropdowncoords[0],
        props.dropdowncoords[1],
      ]);
    } else if (response.id === 3) {
      props.setConfirmThree([
        true,
        props.dropdowncoords[0],
        props.dropdowncoords[1],
      ]);
    }

    // coords match, need to update user table
    // additioanlly we need to check if the selected picture matches the one user selected
    const updateResult = await updateUser(response, userId);

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
    props.setFinalTime(finalTime);
    props.setStartCount(!props.startCount);
    props.setEndGameModal(!props.endGameModal);
    // we then need to prompt the user to add their username to the leaderboard.
    // let's open a modal which displays their time, and then prompts them for their user which we will update on the leaderboards.
  };

  return (
    <>
      <div
        className={`dropdownContainer ${props.dropdown}`}
        style={{ left: dropdownx, top: dropdowny }}
      >
        <div className="dropdownOptionOne">
          <img
            className="targetImg"
            src={target1}
            onClick={() => handleDropdownClick(1)}
          ></img>
        </div>
        <div className="dropdownOptionTwo">
          <img
            className="targetImg"
            src={target2}
            onClick={() => handleDropdownClick(2)}
          ></img>
        </div>
        <div className="dropdownOptionThree">
          <img
            className="targetImg"
            src={target3}
            onClick={() => handleDropdownClick(3)}
          ></img>
        </div>
      </div>
    </>
  );
}

export default Dropdown;
