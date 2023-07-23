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

    function expandAndCollapse() {
      var desc = document.getElementById(`taskdescription${props.id}`);
      if (desc.style.display == "block") {
        desc.style.display = "none";
      } else {
        desc.style.display = "block";
      }
    }

    const defaultHeight = 78;
    const expandedHeight = 200;
    var height = expanded ? expandedHeight : defaultHeight;


    return (
      <div className="task">
        <div className="content" onClick={expandAndCollapse}>
          <div id="metadata">
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
          <h4 id="tasktitle">{props.title}</h4>
          <p id="taskdateadded">{props.dateAdded} &#160;&#x2022;&#160; Due {dayDisplay == "Today" || dayDisplay == "Tomorrow" ? dayDisplay : "in " + dayDisplay}</p>
          <p class="taskdescription" id={`taskdescription${props.id}`}>{props.description}</p>
        </div>
      </div>
    );
};

export default TodoListItem;