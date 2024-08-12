import target1 from "../assets/target1.png";
import target2 from "../assets/target2.png";
import target3 from "../assets/target3.png";
import "../styles/targets.css";

function Targets() {
  return (
    <>
      <div className="targetContainer">
        <h4>Find these three characters:</h4>
        <div className="findTargets">
          <div className="test">
            <img className="targetImages" src={target1}></img>
          </div>

          <img className="targetImages" src={target2}></img>
          <img className="targetImages" src={target3}></img>
        </div>
      </div>
    </>
  );
}

export default Targets;
