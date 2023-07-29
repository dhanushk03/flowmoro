import React from "react";
import "./TimerTodoListItem.css";

const TimerTodoListItem = (props) => {
    return (
        <div className="timertodolistitem">
            <h4 className="timertodotitle">{props.title}</h4>
        </div>
    );
}

export default TimerTodoListItem;