import React from "react";
import { useState } from "react";
import StudyLogItem from "./StudyLogItem.js";
import "./StudyLog.css";

const StudyLog = () => {
    const[studyLog, setStudyLog] = useState(() => {
        let log = localStorage.getItem("studyLog");
        return log? log : []
    });

    return (
        <div className="studylog">
            <h1 className="title">This is the study log page</h1>
            <div>
                {studyLog.map((item) => 
                    <StudyLogItem
                        date={item.date}
                        session={item.session}
                    />
                )}
            </div>
        </div>
    );
}

export default StudyLog;