import "../styles/targetbox.css";

function ConfirmBox(props) {
  const targetX = props.coordx - 8 + "px";
  const targetY = props.coordy - 8 + "px";
  return (
    <>
      <div
        className={`confirmTarget ${props.targetshow}`}
        style={{ top: targetY, left: targetX }}
      ></div>
    </>
  );
}

export default ConfirmBox;
