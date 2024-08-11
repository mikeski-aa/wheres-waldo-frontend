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
          <table className="myTable">
            {props.leaderboard.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.gametime}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export default LeaderboardsModal;
