import './App.css';
import React from "react";
import CountdownTimer from "./Components/CountdownTimer/CountdownTimer.js";
import Navbar from "./Components/Navbar.js"

function App() {
  return (
    <div className="App">
      <Navbar />
      <CountdownTimer />
    </div>
  );
}

export default App;
