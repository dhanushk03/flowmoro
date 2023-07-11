import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  //const [paused, setPaused] = useState(true);

  function padzeroes(num){
    return String(num).length == 1? "0" + num : String(num);
  }
  
  //setTimeout(updateTime, 1000);
  
  function updateTime(){
    setElapsedTime(Date.now() - startTime);

    var secs = Math.floor((elapsedTime / 1000) % 60);
    var mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    var hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    //update time display
    setSeconds(padzeroes(secs));
    setMinutes(padzeroes(mins));
    setHours(padzeroes(hrs));
  }

  return (
    <div className="App">
      <h1>{hours}:{minutes}:{seconds}</h1>
    </div>
  );
}

export default App;
