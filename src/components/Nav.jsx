import "../styles/nav.css";

function Nav() {
  return (
    <>
      <div className="navBarContainer">
        <div className="optionOne">Game one</div>
        <div className="optionTwo">Game two</div>
        <div className="optionThree">Game three</div>
        <button>leaderboards</button>
      </div>
    </>
  );
}

export default Nav;
