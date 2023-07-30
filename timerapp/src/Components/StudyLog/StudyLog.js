import React from "react";
import { useState } from "react";
import StudyLogItem from "./StudyLogItem.js";
import "./StudyLog.css";

const StudyLog = () => {
    const[studyLog, setStudyLog] = useState(() => {
        let log = JSON.parse(localStorage.getItem("studyLog"));
        return log? log : []
    });

    const [todoList, setTodoList] = useState(() => {
        const localData = localStorage.getItem('todoList');
        return localData ? JSON.parse(localData) : [];
    });

    // function mapIdToTitle() {
    //     for(let i = 0; i < studyLog.length; i++) {
    //         const sessionObject = studyLog[i];
    //         const studySession = sessionObject.studySession;
    //         setStudyLog((prevStudyLog) => {

    //         })

    //     }
    // }

    return (
        <div className="studylog">
            {/* <h1 className="title">This is the study log page</h1> */}
            <div className="studylist">
                {studyLog.map((item) => 
                    <StudyLogItem
                        studySession={item.studySession}
                        startDate={item.startDate}
                        startTime={item.startTime}
                        endTime={item.endTime}
                    />
                )}
            </div>
        </div>
    );
}

export default StudyLog;