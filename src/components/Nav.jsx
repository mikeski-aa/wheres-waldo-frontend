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
        <button className="leaderboardsBtn" onClick={handleShowModal}>
          leaderboards
        </button>
      </div>
    </>
  );
}

export default Nav;
