import "../styles/dropdown.css";

function Dropdown(props) {
  const dropdownx = props.dropdownX + 15 + "px";
  const dropdowny = props.dropdownY + "px";

  return (
    <>
      <div
        className={`dropdownContainer ${props.dropdown}`}
        style={{ left: dropdownx, top: dropdowny }}
      >
        <div className="dropdownOptionOne">Option One</div>
        <div className="dropdownOptionTwo">Option Two</div>
        <div className="dropdownOptionThree">Option Three</div>
      </div>
    </>
  );
}

export default Dropdown;
