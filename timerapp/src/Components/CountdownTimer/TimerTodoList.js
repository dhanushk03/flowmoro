import React from "react";
import { useState } from "react";
import TimerTodoListItem from "./TimerTodoListItem.js";
import "./TimerTodoList.css";

const TimerTodoList = (props) => {
    const [todoList, setTodoList] = useState(() => {
        let list = localStorage.getItem("todoList");
        return list ? JSON.parse(list) : [];
    });
    return (
        <div className="timertodolist">
            <h3 style={{position:"relative", left:"5px"}}>Selcet to-dos being worked on</h3>
            <hr style={{height:"1px"}}></hr>
            {todoList.map((item) => {
                return (
                    <div>
                        <TimerTodoListItem
                            title={item.title}
                            deadline={item.deadline}
                            id={item.id}
                            updateActive={props.updateActive}
                            isActive={props.isActive}
                        />
                        <hr style={{height:"1px"}}></hr>
                    </div>
                );
            })}
        </div>
    );
}

export default TimerTodoList;