import React from "react";
import { useState, useEffect } from "react";
import "./CountdownTimer.css";

var defaultRemainingTimeWork = {
    seconds: '00',
    minutes: '25',
    hours: '00',
}

var defaultRemainingTimeBreak = {
    seconds: '00',
    minutes: '05',
    hours: '00',
}

const defaultWorkSessionNumber = 1;
const defaultBreakSessionNumber = 1;
const defaultIsWork = true;
var defaultTotalTimeInSecondsWork = 25 * 60;
var defaultTotalTimeInSecondsRest = 5 * 60;

const CountdownTimer = (props) => {
    /**
     * Want to calculate total number of seconds and store it.
     * As the timer ticks down, want to change the percentage of the arc colored white proportional to the amount of time remaining.
     * I want to provide an input form for the user to set their preferred time studying.
     */
    const [counter, setCounter] = useState(1);
    const [userSpecifiedTime, setUserSpecifiedTime] = useState(() => {
        const bool = localStorage.getItem('userSpecifiedTime');
        return bool == 'false' || bool == null ? false : true;
    });  //fetch from localStorage later
    const [userTimeInputHours, setUserTimeInputHours] = useState("00");
    const [userTimeInputMinutes, setUserTimeInputMinutes] = useState("25");
    const [userTimeInputSeconds, setUserTimeInputSeconds] = useState("00");
    const [remainingTime, setRemainingTime] = useState(() => {
        const time = JSON.parse(localStorage.getItem('remainingTime'));
        return time ? time : defaultRemainingTimeWork;
    });
    const [paused, setPaused] = useState(() => {
        const bool = localStorage.getItem('paused');
        return bool == 'false' ? false : true;
    });
    const [workSession, setWorkSession] = useState(() => {
        const number = Number(localStorage.getItem('workSession'));
        return number ? number : defaultWorkSessionNumber;
    });
    const [breakSession, setBreakSession] = useState(() => {
        const number = Number(localStorage.getItem('breakSession'));
        return number ? number : defaultBreakSessionNumber;
    });
    const [isWork, setIsWork] = useState(() => {
        const bool = localStorage.getItem('isWork');
        return bool == 'false' ? false : true;
    });
    const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(() => {
        const time = Number(localStorage.getItem('remainingTimeInSeconds'));
        const original = isWork ? defaultTotalTimeInSecondsWork : defaultTotalTimeInSecondsRest;
        return time ? time : original;
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            //document.title = `Flowmodoro ${remainingTime.hours != "00" ? remainingTime.hours + ":" : ""}${remainingTime.minutes}:${remainingTime.seconds}`;
            if (!paused && userSpecifiedTime) {
                updateRemainingTime();
            }
            localStorage.setItem('userSpecifiedTime', String(userSpecifiedTime));
            localStorage.setItem('remainingTime', JSON.stringify(remainingTime));
            localStorage.setItem('paused', String(paused));
            localStorage.setItem('remainingTimeInSeconds', String(remainingTimeInSeconds));
            localStorage.setItem('isWork', String(isWork));
            localStorage.setItem('workSession', String(workSession));
            localStorage.setItem('breakSession', String(breakSession));
        }, 1000);
        return () => clearTimeout(intervalId);
    }, [remainingTime, paused]);

    function updateRemainingTime() {
        //case1: seconds goes from 00 to 59
        //case2: minutes goes from 00 to 59
        if (remainingTime.seconds === "00" && remainingTime.minutes === "00" && remainingTime.hours === "00" && isWork) {
            setRemainingTime(defaultRemainingTimeBreak);
            setIsWork((prevIsWork) => !prevIsWork);
            setWorkSession((prevWorkSession) => prevWorkSession + 1);
            setRemainingTimeInSeconds(defaultTotalTimeInSecondsRest);
            return;
        } else if (remainingTime.seconds === "00" && remainingTime.minutes === "00" && remainingTime.hours === "00" && !isWork) {
            setRemainingTime(defaultRemainingTimeWork);
            setIsWork((prevIsWork) => !prevIsWork);
            setBreakSession((prevWorkSession) => prevWorkSession + 1);
            setRemainingTimeInSeconds(defaultTotalTimeInSecondsWork);
            return;
        }

        var nseconds = remainingTime.seconds.charAt(0) === "0" ? parseInt(remainingTime.seconds.charAt(1)) : parseInt(remainingTime.seconds);
        var nminutes = remainingTime.minutes.charAt(0) === "0" ? parseInt(remainingTime.minutes.charAt(1)) : parseInt(remainingTime.minutes);
        var nhours = remainingTime.hours.charAt(0) === "0" ? parseInt(remainingTime.hours.charAt(1)) : parseInt(remainingTime.hours);

        nseconds = nseconds == 0 ? 59 : nseconds - 1;
        if (nseconds === 59 && nminutes > 0) {
            nminutes -= 1;
        }
        else if (nseconds === 59 && nminutes === 0) {
            nminutes = 59;
        }

        if (nseconds === 59 && nminutes == 59 && nhours > 0) {
            nhours -= 1
        }

        nseconds = padZeroes(nseconds);
        nminutes = padZeroes(nminutes);
        nhours = padZeroes(nhours);

        setRemainingTime(() => {
            return {
                seconds: nseconds,
                minutes: nminutes,
                hours: nhours
            }
        });

        setRemainingTimeInSeconds(prevTime => prevTime - 1);
        
        function padZeroes(num) {
            return String(num).length === 2 ? String(num) : "0" + String(num);
        }
    }

    function endSession() {
        setWorkSession(defaultWorkSessionNumber);
        setBreakSession(defaultBreakSessionNumber);
        setUserSpecifiedTime(false);
        setIsWork(true);
        resetTime();
    }

    function resetTime() {
        if (isWork) {
            setRemainingTime(defaultRemainingTimeWork);
            setRemainingTimeInSeconds(defaultTotalTimeInSecondsWork);
        } else {
            setRemainingTime(defaultRemainingTimeBreak);
            setRemainingTimeInSeconds(defaultTotalTimeInSecondsRest);
        }
        setPaused(true);
    }

    const handleChange = (event) => {
        if (event.target.name === "inputHours") {
            setUserTimeInputHours(event.target.value);
        } 
        else if (event.target.name === "inputMinutes") {
            setUserTimeInputMinutes(event.target.value);
        }
        else if (event.target.name === "inputSeconds") {
            setUserTimeInputSeconds(event.target.value);
        }
    };

    function removeZeroes(num) {
        if (num.charAt(0) == "0" && num.length > 1) {
            return num.charAt(1);
        } else {
            return num;
        }
    }

    function parseTime() {
        var time = Number(userTimeInputSeconds) + 60 * Number(userTimeInputMinutes) + 3600 * Number(userTimeInputHours);
        console.log(time);
        return time
    }

    var x = isWork? remainingTimeInSeconds / defaultTotalTimeInSecondsWork : remainingTimeInSeconds / defaultTotalTimeInSecondsRest;
    var f = remainingTime.hours == "00" ? 90 : 68;

    return (
        <div className="wrapper">
            {userSpecifiedTime ?
                <div className="session-counter">
                    {isWork? <h2>Focus {workSession}</h2> : <h2>Break {breakSession}</h2>}
                </div>
                :
                <div className="session-counter">
                    <h2>Select focus and break times</h2>
                </div>
            }
            <div className="countdown-timer" style={{"--x": x, "--f": f}}>
                <div className="inner-circle">
                    <div className="timertext">
                        {userSpecifiedTime ?
                            <span>
                                {remainingTime.hours != "00" && <span>{remainingTime.hours}</span>}
                                {remainingTime.hours != "00" && <span>:</span>}
                            </span>
                            :
                            <span>
                                <input 
                                    type="text"
                                    name="inputHours"
                                    id="inputHours"
                                    minLength="2"
                                    maxLength="2"
                                    className="timeinputform"
                                    value={userTimeInputHours}
                                    onChange={handleChange}
                                />
                                <span>:</span>
                            </span>
                        }
                        {userSpecifiedTime ? 
                            <span>
                                <span>{remainingTime.minutes}</span>
                                <span>:</span>
                            </span>
                            :
                            <span>
                                <input 
                                    type="text"
                                    name="inputMinutes"
                                    id="inputMinutes"
                                    minLength="2"
                                    maxLength="2"
                                    className="timeinputform"
                                    value={userTimeInputMinutes}
                                    onChange={handleChange}
                                />
                                <span>:</span>
                            </span>
                        }
                        {userSpecifiedTime ? 
                            <span>
                                <span>{remainingTime.seconds}</span>
                            </span>
                            :
                            <span>
                                <input 
                                    type="text"
                                    name="inputSeconds"
                                    id="inputSeconds"
                                    minLength="2"
                                    maxLength="2"
                                    className="timeinputform"
                                    value={userTimeInputSeconds}
                                    onChange={handleChange}
                                />
                            </span>
                        }
                        {!userSpecifiedTime && 
                            <button onClick={() => {
                                if (counter == 1) {
                                    setRemainingTime({
                                        seconds: userTimeInputSeconds,
                                        minutes: userTimeInputMinutes,
                                        hours: userTimeInputHours
                                    });
                                    defaultTotalTimeInSecondsWork = parseTime();
                                    setRemainingTimeInSeconds(defaultTotalTimeInSecondsWork);
                                    defaultRemainingTimeWork = {
                                        seconds: userTimeInputSeconds,
                                        minutes: userTimeInputMinutes,
                                        hours: userTimeInputHours
                                    };
                                    setUserTimeInputSeconds("00");
                                    setUserTimeInputMinutes("05");
                                    setUserTimeInputHours("00");
                                    setCounter(2);
                                }
                                else if (counter == 2) {
                                    defaultTotalTimeInSecondsRest = parseTime();
                                    defaultRemainingTimeBreak = {
                                        seconds: userTimeInputSeconds,
                                        minutes: userTimeInputMinutes,
                                        hours: userTimeInputHours
                                    };
                                    setCounter(1);
                                    setUserTimeInputSeconds("00");
                                    setUserTimeInputMinutes("25");
                                    setUserTimeInputHours("00");
                                    setUserSpecifiedTime(true);
                                }
                            }} className="settimebutton">
                                Set {counter == 1 ? "focus" : "break"} time
                            </button>
                        }
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button onClick={resetTime} className="resetbutton">
                    <p id="reseticon">&#8634;</p>
                </button>
                <button onClick={() => setPaused(!paused)} className="playbutton">
                    {paused? <div id="startBtn"></div> : <div id="pauseBtn"></div>}
                </button>
                <button onClick={endSession} className="endsessionbutton">
                    <p id="endsessiontext">&#11036;</p>
                </button>
            </div>
        </div>
        
    )
}

export default CountdownTimer;