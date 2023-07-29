import React from "react";
import { useState } from "react";
import TimerTodoListItem from "./TimerTodoListItem.js";
import "./TimerTodoList.css";

const TimerTodoList = () => {
    const [todoList, setTodoList] = useState(() => {
        let list = localStorage.getItem("todoList");
        return list ? JSON.parse(list) : []
    });
    return (
        <div className="timertodolist">
            <hr></hr>
            {todoList.map((item) => {
                return (
                    <div>
                        <TimerTodoListItem
                            title={item.title}
                            deadline={item.deadline}
                        />
                        <hr></hr>
                    </div>
                );
            })}
        </div>
    );
}

export default TimerTodoList;