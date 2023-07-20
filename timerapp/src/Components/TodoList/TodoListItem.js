import React from "react";
import "./TodoListItem.css";

const TodoListItem = (props) => {
    var dayDisplay = 0;
    if (props.deadline == 0) {
      dayDisplay = "Today";
    } else if (props.deadline == 1) {
      dayDisplay = "Tomm";
    } else {
      dayDisplay = props.deadline + " days";
    }

    return (
      <div className="task">
        <div className="content">
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
          <h2 id="tasktitle">{props.title}</h2>
          <p id="taskdateadded">{props.dateAdded}</p>
          <p id="taskdescription">{props.description}</p>
        </div>
      </div>
    );
};

export default TodoListItem;