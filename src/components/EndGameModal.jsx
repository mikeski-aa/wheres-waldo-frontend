import { useState } from "react";
import "../styles/modal.css";

function EndGameModal(props) {
  const [username, setUsername] = useState("");
  const okClickHandler = async () => {};
  const handleNameInput = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };
  return (
    <>
      <div className={`modal ${props.visibility}`}>
        <div className="endGameContainer">
          <div className="containerHeader">
            Congratualations, you found all three characters in:
          </div>
          <div className="containerMainTime">{props.finaltime}</div>
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
              ></input>
              <button className="endOkButton" onClick={okClickHandler}>
                OK
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EndGameModal;
