import React from "react";
import { useState } from "react";
import "./TimerTodoListItem.css";

const TimerTodoListItem = (props) => {
    const [inProgress, setInProgress]= useState(() => {
        return props.isActive(props.id, props.title);
    });

    var bg = "transparent";
    var textcolor = "white";

    function initializeBackground() {
        if (inProgress) {
            bg = "#FF7F50";
            textcolor = "black";
        } else {
            bg = "#7b00e8";
            textcolor = "white";
        }
    }

    initializeBackground();

    return (
        <div className="timertodolistitem" id={`timertodolistitem${props.id}`} style={{"background":bg, "color":textcolor}} onClick={() => {
            var item = document.getElementById(`timertodolistitem${props.id}`);
            if (inProgress) {
                item.style.background = "#7b00e8";
                item.style.color = "white";
                setInProgress(false);
            } else {
                item.style.background = "#FF7F50";
                item.style.color = "black";
                setInProgress(true);
            }
            props.updateActive(props.id, props.title);
        }}>
            {/* <button onClick={props.completeTask(props.id)} className="timertodolistitemcompletebutton" style={{"float": "right", "height": "10px", "width": "10px"}}>
                &#10003;
            </button> */}
            <div className="timertodolistitemcompletebutton" onClick={() => {props.completeTask(props.id)}}>&#10003;</div>
            {/* <p style={{"float": "right"}}>Sample text</p> */}
            <h4 className="timertodotitle">{props.title}</h4>
        </div>
    );
}

export default TimerTodoListItem;