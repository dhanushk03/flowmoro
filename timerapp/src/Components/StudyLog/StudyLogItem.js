import React from "react";
import "./StudyLogItem.css";

const StudyLogItem = (props) => {
    console.log(props.startTime, props.numCompletedTasks);
    const numTasks = Object.keys(props.studySession).length;
    const sortedStudySession = Object.entries(props.studySession).map(([id, seconds])=> {
        return ({
            "id": id,
            "time": seconds
        });
    });
    sortedStudySession.sort(function(a, b) {
        return b.time - a.time;
    });

    function convertToHMS(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - hours * 3600) / 60);
        const secs = seconds - (hours * 3600) - (minutes * 60);
        return `${hours > 0 ? hours + "h" : ""} ${minutes > 0 ? minutes + "m" : ""} ${secs > 0 ? secs + "s" : ""}`;
    }

    function expandLogDetails() {
        var desc = document.getElementById(`studylogdescription${props.id}`);
        if (desc.style.display == "block") {
            desc.style.display = "none";
        } else {
            desc.style.display = "block";
        }
    }

    // {title.length < 50? title : title.substring(0, 49) + "..."}

    return (
        <div className="studylogitem">
            <div className="studylogitemheader" onClick={() => {expandLogDetails();}}>
                <h2>{props.startDate}</h2>
                <h3 style={{"marginTop": "-10px"}}>{props.startTime} &#160; - &#160; {props.endTime} &#160;&#x2022;&#160; {Math.max(numTasks, props.numCompletedTasks)} tasks worked on &#160;&#x2022;&#160; {props.numCompletedTasks ? props.numCompletedTasks : 0} completed</h3>
            </div>
            <div className="sessionData" id={`studylogdescription${props.id}`} style={{"display": "none"}}>
                {
                    sortedStudySession.map((idAndTime) => {
                        var title = props.idToTitle[idAndTime["id"]];
                        return (
                            <div style={{"display": "flex"}}>
                                <p style={{"width": "75%"}}><b>{title}</b></p>
                                <p style={{"float": "right", "marginLeft": "20px"}}>{convertToHMS(idAndTime["time"])}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default StudyLogItem;