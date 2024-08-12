import target1 from "../assets/target1.png";
import target2 from "../assets/target2.png";
import target3 from "../assets/target3.png";
import target1checked from "../assets/target1checked.png";
import target2checked from "../assets/target2checked.png";
import target3checked from "../assets/target3checked.png";
import "../styles/targets.css";
import { useEffect } from "react";

function Targets(props) {
  let showOne = "show";
  let showTwo = "show";
  let showThree = "show";
  let showOneChecked = "hide";
  let showTwoChecked = "hide";
  let showThreeChecked = "hide";

  return (
    <>
      <div className="targetContainer">
        <h4>Find these three characters:</h4>
        <div className="findTargets">
          <img
            className={`targetImages one ${props.confirmOne[0]}`}
            src={target1}
          ></img>
          <img
            className={`targetImages two ${props.confirmTwo[0]}`}
            src={target2}
          ></img>
          <img
            className={`targetImages three ${props.confirmThree[0]}`}
            src={target3}
          ></img>
          <img
            className={`tone ${props.confirmOne[0]}`}
            src={target1checked}
          ></img>
          <img
            className={`ttwo ${props.confirmTwo[0]}`}
            src={target2checked}
          ></img>
          <img
            className={`tthree ${props.confirmThree[0]}`}
            src={target3checked}
          ></img>
        </div>
      </div>
    </>
  );
}

export default Targets;
