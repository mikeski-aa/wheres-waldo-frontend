import "../styles/leaderboardsmodal.css";
import { GetLeaderboards } from "../lib/service";
import { useEffect, useState } from "react";

function LeaderboardsModal(props) {
  const [leaderboards, setLeaderboards] = useState([]);
  const handleCloseClick = () => {
    props.setShow(false);
  };

  const test = async () => {
    const datest = await GetLeaderboards();
    setLeaderboards(datest);
    console.log(datest);
  };

  //   GetLeaderboards.then((resolve) => {
  //     setLeaderboards(resolve);
  //   }).catch((error) => {
  //     console.log(error);
  //   });

  //   useEffect(() => {
  //     const getBoard = async () => {
  //       const response = await GetLeaderboards();

  //       setLeaderboards(response);
  //     };
  //     getBoard();
  //   }, []);
  console.log(leaderboards);

  return (
    <>
      <div className={`lboardModal ${props.show}`}>
        <div className="lboardContainer">
          <button onClick={handleCloseClick}>Close</button>
        </div>
      </div>
    </>
  );
}

export default LeaderboardsModal;
