import React from "react";
import { useState } from "react";
import "./TodoListItem.css";

const TodoListItem = (props) => {
    const [expanded, setExpanded] = useState(false);
    var dayDisplay = 0;
    if (props.deadline == 0) {
      dayDisplay = "Today";
    } else if (props.deadline == 1) {
      dayDisplay = "Tomm";
    } else {
      dayDisplay = props.deadline + " days";
    }

    const defaultHeight = 78;
    const expandedHeight = 200;
    var height = expanded ? expandedHeight : defaultHeight;
    console.log(`${props.id} ${expanded} ${height}`);


    return (
      <div className="task">
        <div className="content" style={{"--height": height}} onClick={() => setExpanded(!expanded)}>
          <div id="metadata">
            <h3 id="taskdeadline">{dayDisplay}</h3>
            <div id="buttons">
              <button id="completeButton"
              onClick={() => {
                props.completeTask(props.id);
              }}
              >
                Complete
              </button>

              <button id="deleteButton"
              onClick={() => {
                props.deleteTask(props.id);
              }}
              >
                Delete
              </button>
            </div>
          </div>
          <h3 id="tasktitle">{props.title}</h3>
          <p id="taskdateadded">{props.dateAdded}</p>
          <p id="taskdescription">{props.description}</p>
        </div>
      </div>
    );
};

export default TodoListItem;