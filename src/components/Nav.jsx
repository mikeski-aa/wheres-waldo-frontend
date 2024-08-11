import "../styles/nav.css";

function Nav(props) {
  const handleShowModal = () => {
    props.setModal(true);
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
