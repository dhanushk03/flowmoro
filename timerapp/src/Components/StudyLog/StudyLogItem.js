import React from "react";
import "./StudyLogItem.css";

const StudyLogItem = (props) => {
    const numTasks = Object.keys(props.studySession).length;
    const sortedStudySession = Object.entries(props.studySession).map(([id, seconds])=> {
        return ({
            "id": id,
            "time": seconds
        });
    });
    sortedStudySession.sort(function(a, b) {
        return b.time - a.time;
    })
    function convertToHMS(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - hours * 3600) / 60);
        const secs = seconds - (hours * 3600) - (minutes * 60);
        return `${hours > 0 ? hours + "h" : ""} ${minutes > 0 ? minutes + "m" : ""} ${secs > 0 ? secs + "s" : ""}`;
    }
    return (
        <div className="studylogitem">
            <h2>{props.startDate}</h2>
            <div className="sessionData" style={{"marginTop": "-10px"}}>
                <p>{props.startTime} &#160; - &#160; {props.endTime} &#160;&#x2022;&#160; {numTasks} tasks worked on</p>
                {
                    sortedStudySession.map((idAndTime) => {
                        return (
                            <p>{props.idToTitle[idAndTime["id"]]} - {convertToHMS(idAndTime["time"])}</p>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default StudyLogItem;