import React from "react";
import { useState, useEffect } from "react";
import "./CountdownTimer.css";

const defaultRemainingTimeWork = {
    seconds: '00',
    minutes: '25',
    hours: '00',
}

const defaultRemainingTimeBreak = {
    seconds: '00',
    minutes: '05',
    hours: '00',
}

const defaultWorkSessionNumber = 1;
const defaultBreakSessionNumber = 1;
const defaultIsWork = true;

const CountdownTimer = (props) => {
    /**
     * Want to calculate total number of seconds and store it.
     * As the timer ticks down, want to change the percentage of the arc colored white proportional to the amount of time remaining.
     * I want to provide an input form for the user to set their preferred time studying.
     */
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTimeWork);
    const [paused, setPaused] = useState(true);
    const [workSession, setWorkSession] = useState(defaultWorkSessionNumber);
    const [breakSession, setBreakSession] = useState(defaultBreakSessionNumber);
    const [isWork, setIsWork] = useState(defaultIsWork);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!paused) {
                updateRemainingTime();
            }
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
            return;
        } else if (remainingTime.seconds === "00" && remainingTime.minutes === "00" && remainingTime.hours === "00" && !isWork) {
            setRemainingTime(defaultRemainingTimeWork);
            setIsWork((prevIsWork) => !prevIsWork);
            setBreakSession((prevWorkSession) => prevWorkSession + 1);
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
        
        function padZeroes(num) {
            return String(num).length === 2 ? String(num) : "0" + String(num);
        }
    }

    function resetTime() {
        if (isWork) {
            setRemainingTime(defaultRemainingTimeWork);
        } else {
            setRemainingTime(defaultRemainingTimeBreak);
        }
        setPaused(true);
    }

    return (
        <div className="wrapper">
            <div className="session-counter">
                {isWork? <h2>Work {workSession}</h2> : <h2>Break {breakSession}</h2>}
            </div>
            <div className="countdown-timer">
                <span>{remainingTime.hours}</span>
                <span>:</span>
                <span>{remainingTime.minutes}</span>
                <span>:</span>
                <span>{remainingTime.seconds}</span>
            </div>
            <div className="buttons">
                <button onClick={() => setPaused(!paused)} className="playbutton">
                    {paused? <div id="startBtn"></div> : <div id="pauseBtn"></div>}
                </button>
                <button onClick={resetTime} className="resetbutton">
                    <p>RESET</p>
                </button>
            </div>
        </div>
        
    )
}

export default CountdownTimer;