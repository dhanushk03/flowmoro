import React from "react";
import "./TimerTodoListItem.css";

const TimerTodoListItem = (props) => {
    return (
        <div className="timertodolistitem" id={`timertodolistitem${props.id}`} onClick={() => {
            var item = document.getElementById(`timertodolistitem${props.id}`);
            if (item.style.background == "orange") {
                item.style.background = "transparent";
            } else {
                item.style.background = "orange";
            }
            props.updateActive(props.id);
        }}>
            <h4 className="timertodotitle">{props.title}</h4>
        </div>
    );
}

export default TimerTodoListItem;