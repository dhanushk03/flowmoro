import React from "react";
import "./StudyLogItem.css";

const StudyLogItem = (props) => {
    const numTasks = Object.keys(props.studySession).length;
    const sortedStudySession = Object.entries(props.studySession).map(([ide, secondse])=> {
        return ({
            "title": ide,
            "time": secondse
        });
    });
    sortedStudySession.sort(function(a, b) {
        return b.time - a.time;
    })
    console.log(sortedStudySession);
    return (
        <div className="studylogitem">
            <h2>{props.startDate}</h2>
            <div className="sessionData" style={{"marginTop": "-10px"}}>
                <p>{props.startTime} &#160; - &#160; {props.endTime} &#160;&#x2022;&#160; {numTasks} tasks worked on</p>
                {
                    sortedStudySession.map((idAndTime) => {
                        return (
                            <p>{idAndTime["title"]} - {idAndTime["time"]}</p>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default StudyLogItem;