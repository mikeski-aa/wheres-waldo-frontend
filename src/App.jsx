import { useState } from "react";
import wheresWaldo from "../src/assets/925901.jpg";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="mainContent">
        <Nav />
        <img src={wheresWaldo} width={1700}></img>
      </div>
    </>
  );
}

export default App;
