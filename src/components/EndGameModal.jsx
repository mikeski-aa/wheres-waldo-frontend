import { useState } from "react";
import { updateUserName } from "../lib/service";
import "../styles/modal.css";

function EndGameModal(props) {
  const [username, setUsername] = useState("");
  const [errorState, setErrorState] = useState(false);
  const okClickHandler = async (e) => {
    if (username === "") {
      return;
    }

    console.log(errorState);
    if (errorState === true) {
      return e.preventDefault();
    }

    const response = await updateUserName(props.userid, username);
    console.log(response);
    window.location.href = "/";
  };
  const handleNameInput = (e) => {
    if (e.target.value.length > 7) {
      setErrorState(true);
    } else {
      setErrorState(false);
    }

    setUsername(e.target.value);
  };
  return (
    <>
      <div className={`modal ${props.visibility}`}>
        <div className="endGameContainer">
          <div className="containerHeader">
            Congratualations, you found all three characters in:
          </div>
          <div className="containerMainTime">{props.finaltime} seconds</div>
          <div className="nameInput">
            <form className="optionalUsername" method="none">
              <label htmlFor="username">
                Enter a username, otherwise you will be anonymous on the
                leaderboards!
              </label>
              <input
                type="text"
                placeholder="Username Unknown"
                onChange={(e) => handleNameInput(e)}
                className={`nameInput ${errorState}`}
              ></input>
              <div className={`error ${errorState}`}>
                Name too long! Current length
                {` ` + username.length}
              </div>
            </form>
          </div>
          <button className="endOkButton" onClick={(e) => okClickHandler(e)}>
            OK
          </button>
        </div>
      </div>
    </>
  );
}

export default EndGameModal;
