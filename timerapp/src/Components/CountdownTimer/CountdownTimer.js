import React from "react";
import { useState, useEffect } from "react";
import "./CountdownTimer.css";

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '01',
}

const CountdownTimer = (props) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime()
        }, 1000);
        return () => clearTimeout(intervalId);
    }, [remainingTime]);

    function updateRemainingTime() {
        //case1: seconds goes from 00 to 59
        //case2: minutes goes from 00 to 59
        //case3: hours goes from 00 to 59
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

    return (
        <div className="countdown-timer">
            <span>{remainingTime.hours}</span>
            <span>HOURS</span>
            <span>{remainingTime.minutes}</span>
            <span>MINUTES</span>
            <span>{remainingTime.seconds}</span>
            <span>SECONDS </span>
        </div>
    )
}

export default CountdownTimer;