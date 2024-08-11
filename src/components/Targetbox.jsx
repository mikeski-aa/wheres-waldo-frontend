import "../styles/targetbox.css";

function Targetbox(props) {
  const targetX = props.coords[0] - 8 + "px";
  const targetY = props.coords[1] - 8 + "px";
  return (
    <>
      <div
        className={`targetBox ${props.targetshow} ${props.targetnumber}`}
        style={{ top: targetY, left: targetX }}
      ></div>
    </>
  );
}

export default Targetbox;
