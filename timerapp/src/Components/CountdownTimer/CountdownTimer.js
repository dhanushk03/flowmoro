import React from "react";
import { useState, useEffect } from "react";
import TimerTodoList from "./TimerTodoList.js";
import "./CountdownTimer.css";
import moment from "moment";
import sound1 from "./positive-notification-new-level-152480.mp3";
import sound2 from "./simple-short-call-loop-153308.mp3";
import HackTimer from "./HackTimer.js";

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
    const [counter, setCounter] = useState(1);
    const [userSpecifiedTime, setUserSpecifiedTime] = useState(() => {
        const bool = localStorage.getItem('userSpecifiedTime');
        return bool == 'false' || bool == null ? false : true;
    });
    const [userTimeInputHours, setUserTimeInputHours] = useState("00");
    const [userTimeInputMinutes, setUserTimeInputMinutes] = useState("25");
    const [userTimeInputSeconds, setUserTimeInputSeconds] = useState("00");
    const [remainingTime, setRemainingTime] = useState(() => {
        if (userSpecifiedTime) {
            const time = JSON.parse(localStorage.getItem('remainingTime'));
            return time ? time : defaultRemainingTimeWork;
        }
        return defaultRemainingTimeWork;
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
        if (userSpecifiedTime) {
            const time = Number(localStorage.getItem('remainingTimeInSeconds'));
            const original = isWork ? defaultTotalTimeInSecondsWork : defaultTotalTimeInSecondsRest;
            return time ? time : original;
        } else {
            return defaultTotalTimeInSecondsWork;
        }
    });
    const [showTodos, setShowTodos] = useState(true);
    const [isDesktopBig, setIsDesktopBig] = useState(window.innerWidth > 1100);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const[studyLog, setStudyLog] = useState(() => {
        let log = JSON.parse(localStorage.getItem("studyLog"));
        return log? log : [];
    });

    const[studySession, setStudySession] = useState(() => {
        let session = JSON.parse(localStorage.getItem("studySession"));
        return session? session : {};
    });

    const[activeTasks, setActiveTasks] = useState(() => {
        let tasks = JSON.parse(localStorage.getItem("activeTasks"));
        return tasks? tasks : [];
    });

    const [initialPlay, setInitialPlay] = useState(() => {
        const bool = localStorage.getItem('initialPlay');
        return (!bool || bool == 'false') ? false : true;
    });

    const [startDate, setStartDate] = useState(() => {
        const date = localStorage.getItem('startDate');
        return date ? date : moment().format('LL');
    });

    const [startTime, setStartTime] = useState(() => {
        const time = localStorage.getItem('startTime');
        return time ? time : moment().format('LT');
    });

    const [endTime, setEndTime] = useState(() => {
        const time = localStorage.getItem('endTime');
        return time ? time : moment().format('LT');
    });

    const [idToTitle, setIdToTitle] = useState(() => {
        const mapping = JSON.parse(localStorage.getItem('idToTitle'));
        return mapping ? mapping : {};
    });

    const [numCompletedTasks, setNumCompletedTasks] = useState(() => {
        const num = Number(localStorage.getItem('numCompletedTasks'));
        return num ? num : 0;
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            document.title = `${remainingTime.hours != "00" ? remainingTime.hours + ":" : ""}${remainingTime.minutes}:${remainingTime.seconds} - Flowmoro`;
            if (!paused && userSpecifiedTime) {
                updateRemainingTime();
                if (isWork) {
                    incrementActiveTasks();
                }
            }
            setEndTime(moment().format('LT'));
            localStorage.setItem('userSpecifiedTime', String(userSpecifiedTime));
            localStorage.setItem('remainingTime', JSON.stringify(remainingTime));
            localStorage.setItem('paused', String(paused));
            localStorage.setItem('remainingTimeInSeconds', String(remainingTimeInSeconds));
            localStorage.setItem('isWork', String(isWork));
            localStorage.setItem('workSession', String(workSession));
            localStorage.setItem('breakSession', String(breakSession));
            localStorage.setItem('studySession', JSON.stringify(studySession));
            localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
            localStorage.setItem('studyLog', JSON.stringify(studyLog));
            localStorage.setItem('initialPlay', JSON.stringify(initialPlay));
            localStorage.setItem('startDate', String(startDate));
            localStorage.setItem('startTime', String(startTime));
            localStorage.setItem('endTime', String(endTime));
            localStorage.setItem('idToTitle', JSON.stringify(idToTitle));
            localStorage.setItem('numCompletedTasks', String(numCompletedTasks));
        }, 1000);
        return () => clearTimeout(intervalId);
    }, [remainingTime, paused]);

    const updateMedia = () => {
        setIsDesktopBig(window.innerWidth > 800);
        if (!isDesktopBig && showTodos) {
            setShowTodos(false);
            setIsCollapsed(true);
        } else if (isCollapsed && isDesktopBig) {
            setShowTodos(true);
            setIsCollapsed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    function updateRemainingTime() {
        //case1: seconds goes from 00 to 59
        //case2: minutes goes from 00 to 59
        if (remainingTime.seconds === "00" && remainingTime.minutes === "00" && remainingTime.hours === "00" && isWork) {
            setRemainingTime(defaultRemainingTimeBreak);
            setIsWork((prevIsWork) => !prevIsWork);
            setWorkSession((prevWorkSession) => prevWorkSession + 1);
            setRemainingTimeInSeconds(defaultTotalTimeInSecondsRest);
            const audio = new Audio(sound2);
            audio.play();
            return;
        } else if (remainingTime.seconds === "00" && remainingTime.minutes === "00" && remainingTime.hours === "00" && !isWork) {
            setRemainingTime(defaultRemainingTimeWork);
            setIsWork((prevIsWork) => !prevIsWork);
            setBreakSession((prevWorkSession) => prevWorkSession + 1);
            setRemainingTimeInSeconds(defaultTotalTimeInSecondsWork);
            const audio = new Audio(sound2);
            audio.play();
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

    function incrementActiveTasks() {
        activeTasks.forEach(function(id) {
            setStudySession((prevSession) => {
                if (id in prevSession) {
                    prevSession[id] += 1;
                } else {
                    prevSession[id] = 1;
                }
                return prevSession;
            });
        });
    }

    function isActive(id) {
        var found = activeTasks.some(function(activeItemId) {
            return activeItemId == id;
        });
        return found;
    }

    function updateActive(id, title) {
        var found = activeTasks.some(function(activeItemId) {
            if (activeItemId == id) {
                setActiveTasks((prevActiveTasks) => {
                    return prevActiveTasks.filter((prevId) => {
                        return prevId != id;
                    })
                });
            }
            return activeItemId == id;
        });
        if (!found) {
            setIdToTitle((prevIdToTitle) => {
                prevIdToTitle[id] = title;
                return prevIdToTitle;
            })
            setActiveTasks((prevActiveTasks) => {
                return [...prevActiveTasks, id];
            });
            localStorage.setItem('idToTitle', JSON.stringify(idToTitle));
        }
        localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
    }

    function endSession() {
        if (!userSpecifiedTime || (workSession == 1 && remainingTimeInSeconds == defaultTotalTimeInSecondsWork)) {
            alert("Start focus session by pressing play");
            return;
        }
        async function updateEndTime() {
            const time = await moment().format('LT');
            setEndTime(time);
            // console.log(endTime);
            localStorage.setItem('endTime', JSON.stringify(endTime));
        }
        updateEndTime();
        setShowTodos(false);
        setWorkSession(defaultWorkSessionNumber);
        setBreakSession(defaultBreakSessionNumber);
        setUserSpecifiedTime(false);
        setIsWork(true);
        setRemainingTime(defaultRemainingTimeWork);
        localStorage.setItem("remainingTime", JSON.stringify(defaultRemainingTimeWork));
        setRemainingTimeInSeconds(defaultTotalTimeInSecondsWork);
        localStorage.setItem("remainingTimeInSeconds", String(defaultTotalTimeInSecondsWork));
        setPaused(true);
        setStudyLog([{"studySession": {...studySession}, "idToTitle": {...idToTitle}, "startDate": startDate, "startTime": startTime, "endTime": endTime, "numCompletedTasks": numCompletedTasks}, ...studyLog]);
        localStorage.setItem("studyLog", JSON.stringify(studyLog));
        setStudySession({});
        localStorage.setItem("studySession", JSON.stringify(studySession));
        setActiveTasks([]);
        localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
        setIdToTitle({});
        localStorage.setItem("idToTitle", JSON.stringify(idToTitle));
        setNumCompletedTasks(0);
        localStorage.setItem('numCompletedTasks', String(0));
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

    function fastForward() {
        if(!userSpecifiedTime) {
            alert("Please set focus and break times before fast-forwarding sessions");
            return;
        }
        if (isWork) {
            setIsWork(false);
            if (workSession != 1) {
                setBreakSession((prev) => prev + 1);
            }
            setRemainingTime(defaultRemainingTimeBreak);
            setRemainingTimeInSeconds(defaultTotalTimeInSecondsRest);
        } else {
            setIsWork(true);
            setWorkSession((prev) => prev + 1);
            setRemainingTime(defaultRemainingTimeWork);
            setRemainingTimeInSeconds(defaultTotalTimeInSecondsWork);
        }
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
        return time
    }

    var x = isWork? remainingTimeInSeconds / defaultTotalTimeInSecondsWork : remainingTimeInSeconds / defaultTotalTimeInSecondsRest;
    var f = remainingTime.hours == "00" ? 90 : 68;
    var offset = showTodos ? 165 : 0;

    return (
        <div className="todolistandtimer">
            <div className="showtodoslogic">
                <button onClick={() => {
                    if (isDesktopBig) {
                        setShowTodos(!showTodos);
                }}} className="showtodosbutton">
                    &#9776;
                </button>
                {showTodos && <TimerTodoList updateActive={updateActive} isActive={isActive} incrementCompleted={setNumCompletedTasks}/>}
            </div>
            <div style={{"--offset": offset}} className="countdown-wrapper">
                {userSpecifiedTime ?
                    <div className="session-counter">
                        {isWork? <h2>Focus {workSession}</h2> : <h2>Break {breakSession}</h2>}
                    </div>
                    :
                    <div className="session-counter">
                        <h2>Set focus and break times</h2>
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
                                        autofocus
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
                                <p style={{"fontSize":"12px", "color": "white", "marginTop": "-8px"}}><span style={{"padding": "45px"}}>HH</span><span style={{"padding": "45px"}}>MM</span><span style={{"padding": "45px"}}>SS</span></p>
                            }
                            {!userSpecifiedTime && 
                                <button onClick={() => {
                                    if (userTimeInputSeconds.length != 2 || userTimeInputMinutes.length != 2 
                                        || userTimeInputHours.length != 2) {
                                            return;
                                    }

                                    const validNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                                    for(let i = 0; i < 2; i++) {
                                        if (!(validNums.includes(userTimeInputHours.charAt(i)) && validNums.includes(userTimeInputMinutes.charAt(i)) 
                                            && validNums.includes(userTimeInputSeconds.charAt(i)))) {
                                                return;
                                        }
                                    }

                                    if (Number(userTimeInputMinutes.charAt(0)) > 5 || Number(userTimeInputSeconds.charAt(0)) > 5) {
                                            return;
                                    }

                                    if (counter == 1) {
                                        setRemainingTime({
                                            seconds: userTimeInputSeconds,
                                            minutes: userTimeInputMinutes,
                                            hours: userTimeInputHours
                                        });
                                        defaultTotalTimeInSecondsWork = parseTime();
                                        if (defaultTotalTimeInSecondsWork < 10) {
                                            alert("Please set a focus duration greater than 10 seconds");
                                            return;
                                        }
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
                                        if (defaultTotalTimeInSecondsRest < 10) {
                                            alert("Please set a break duration greater than 10 seconds");
                                            return;
                                        }
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
                                        setInitialPlay(true);
                                    }
                                }} className="settimebutton">
                                    Set {counter == 1 ? "focus" : "break"} time
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className="countdown-buttons">
                    <button onClick={fastForward} className="fastforwardbutton">
                        {/* <img src={forward} width="50px" height="50px" /> */}
                        <p id="fastforwardicon">&#8667;</p>
                    </button>
                    <button onClick={() => {
                        if(!userSpecifiedTime) {
                            alert(`Click the set time button to confirm ${counter == 1? "focus" : "break"} time`);
                            return;
                        }
                        setPaused(!paused);
                        if (initialPlay) {
                            setStartDate(moment().format('LL'));
                            setStartTime(moment().format('LT'));
                            setEndTime(moment().format('LT'));
                            setInitialPlay(false);
                            localStorage.setItem('startDate', String(startDate));
                            localStorage.setItem('startTime', String(startTime));
                            localStorage.setItem('endTime', String(endTime));
                            localStorage.setItem('initialPlay', String(initialPlay));
                        }
                    }} className="playbutton">
                        {paused? <div id="startBtn"></div> : <div id="pauseBtn"></div>}
                    </button>
                    <button onClick={endSession} className="endsessionbutton">
                        <p id="endsessiontext">&#10003;</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CountdownTimer;