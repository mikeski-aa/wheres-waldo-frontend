import "../styles/modal.css";

function EndGameModal(params) {
  return (
    <>
      <div className={`modal ${params.visibility}`}>
        <div className="endGameContainer">
          <div className="containerHeader">
            Congratualations, you found all three characters in:
          </div>
          <div className="containerMainTime">x seconds</div>
          <div className="nameInput">
            <form
              className="optionalUsername"
              method="none"
              action={(e) => e.preventDefault()}
            >
              <label htmlFor="username">
                Enter a username, otherwise you will be anonymous on the
                leaderboards!
              </label>
              <input type="text" placeholder="Username Unknown"></input>
              <button>OK</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EndGameModal;
