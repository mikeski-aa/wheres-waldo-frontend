import "../styles/nav.css";
import { GetLeaderboards } from "../lib/service";

function Nav(props) {
  const handleShowModal = async () => {
    props.setModal(true);
    const response = await GetLeaderboards();
    props.setLeaderboard(response);
  };
  return (
    <>
      <div className="navBarContainer">
        <button className="optionOne">Game one</button>
        <button className="optionTwo">Game two</button>
        <button className="optionThree">Game three</button>
        <button className="leaderboardsBtn" onClick={handleShowModal}>
          leaderboards
        </button>
      </div>
    </>
  );
}

export default Nav;
