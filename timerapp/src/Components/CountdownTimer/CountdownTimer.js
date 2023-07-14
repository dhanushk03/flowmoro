import React from "react";
import { useState, useEffect } from "react";
import "./CountdownTimer.css";

const defaultRemainingTime = {
    seconds: '00',
    minutes: '05',
    hours: '00',
}

const CountdownTimer = (props) => {
    /**
     * Want to calculate total number of seconds and store it.
     * As the timer ticks down, want to change the percentage of the arc colored white proportional to the amount of time remaining.
     * I want to provide an input form for the user to set their preferred time studying.
     */
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
    const [paused, setPaused] = useState(true);

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
        if (remainingTime.seconds == "00" && remainingTime.minutes == "00" && remainingTime.hours == "00") {
            return;
        }

        var nseconds = remainingTime.seconds.charAt(0) == "0" ? parseInt(remainingTime.seconds.charAt(1)) : parseInt(remainingTime.seconds);
        var nminutes = remainingTime.minutes.charAt(0) == "0" ? parseInt(remainingTime.minutes.charAt(1)) : parseInt(remainingTime.minutes);
        var nhours = remainingTime.hours.charAt(0) == "0" ? parseInt(remainingTime.hours.charAt(1)) : parseInt(remainingTime.hours);

        nseconds = nseconds == 0 ? 59 : nseconds - 1;
        if (nseconds == 59 && nminutes > 0) {
            nminutes -= 1;
        }
        else if (nseconds == 59 && nminutes == 0) {
            nminutes = 59;
        }

        if (nseconds == 59 && nminutes == 59 && nhours > 0) {
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
            return String(num).length == 2 ? String(num) : "0" + String(num);
        }
    }

    function resetTime() {
        setRemainingTime(defaultRemainingTime);
        setPaused(true);
    }

    return (
        <div className="wrapper">
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