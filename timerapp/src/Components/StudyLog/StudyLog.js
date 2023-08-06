import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
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

    return (
        <div className="studylog">
            {/* <h1 className="title">This is the study log page</h1> */}
            <div className="studylist">
                {studyLog.map((item) => 
                    <StudyLogItem
                        studySession={item.studySession}
                        idToTitle={item.idToTitle}
                        startDate={item.startDate}
                        startTime={item.startTime}
                        endTime={item.endTime}
                        id={uuidv4()}
                    />
                )}
            </div>
        </div>
    );
}

export default StudyLog;