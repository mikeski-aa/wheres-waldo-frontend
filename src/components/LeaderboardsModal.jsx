import "../styles/leaderboardsmodal.css";

function LeaderboardsModal(props) {
  const handleCloseClick = () => {
    props.setShow(false);
  };

  console.log(props.leaderboard);
  return (
    <>
      <div className={`lboardModal ${props.show}`}>
        <div className="lboardContainer">
          <button onClick={handleCloseClick}>Close</button>
          <div className="myTable">
            <div className="tableHeader">Leaderboard</div>
            <div className="itemContainer headings">
              <div className="usernameRow">Username</div>
              <div className="gametimeRow">Time</div>
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
