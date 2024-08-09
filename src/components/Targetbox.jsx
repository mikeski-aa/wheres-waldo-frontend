import "../styles/targetbox.css";

function Targetbox(props) {
  const targetX = props.targetX - 7.5 + "px";
  const targetY = props.targetY - 7.5 + "px";
  return (
    <>
      <div
        className={`targetBox ${props.targetshow}`}
        style={{ top: targetY, left: targetX }}
      ></div>
    </>
  );
}

export default Targetbox;
