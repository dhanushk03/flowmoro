import React from "react";
import { useState } from "react";
import "./TimerTodoListItem.css";

const TimerTodoListItem = (props) => {
    const [inProgress, setInProgress]= useState(() => {
        return props.isActive(props.id, props.title);
    });

    var bg = "transparent";

    function initializeBackground() {
        if (inProgress) {
            bg = "orange";
        } else {
            bg = "transparent";
        }
    }

    initializeBackground();

    return (
        <div className="timertodolistitem" id={`timertodolistitem${props.id}`} style={{"background":bg}} onClick={() => {
            var item = document.getElementById(`timertodolistitem${props.id}`);
            if (inProgress) {
                item.style.background = "transparent";
                setInProgress(false);
            } else {
                item.style.background = "orange";
                setInProgress(true);
            }
            props.updateActive(props.id, props.title);
        }}>
            <h4 className="timertodotitle">{props.title}</h4>
        </div>
    );
}

export default TimerTodoListItem;