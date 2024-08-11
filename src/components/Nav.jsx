import "../styles/nav.css";

function Nav() {
  return (
    <>
      <div className="navBarContainer">
        <button className="optionOne">Game one</button>
        <button className="optionTwo">Game two</button>
        <button className="optionThree">Game three</button>
        <button className="leaderboardsBtn">leaderboards</button>
      </div>
    </>
  );
}

export default Nav;
