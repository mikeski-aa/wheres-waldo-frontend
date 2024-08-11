import "../styles/startmodal.css";

function StartGameModal(props) {
  return (
    <>
      <div className={`startModal ${props.gamestate}`}>
        <div className="startContainer">
          <button className="startGameButton" onClick={props.buttonaction}>
            Start game
          </button>
        </div>
      </div>
    </>
  );
}

export default StartGameModal;
