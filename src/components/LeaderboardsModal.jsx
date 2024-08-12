import "../styles/leaderboardsmodal.css";

function LeaderboardsModal(props) {
  const handleCloseClick = () => {
    props.setShow(false);
  };

  return (
    <>
      <div className={`lboardModal ${props.show}`}>
        <div className="lboardContainer">
          <button className="closeLeaderboardBtn" onClick={handleCloseClick}>
            Close
          </button>
          <div className="myTable">
            <div className="tableHeader">Leaderboard</div>
            <div className="itemContainer headings">
              <div className="headingRowUname">Username</div>
              <div className="headingRowTime">Time (s)</div>
            </div>
            {props.leaderboard.map((item) => {
              return (
                <div className="itemContainer" key={item.id}>
                  <div className="usernameRow">{item.username}</div>
                  <div className="gametimeRow">{item.gametime}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaderboardsModal;
