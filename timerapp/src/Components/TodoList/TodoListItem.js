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
        setExpanded(false);
      } else {
        desc.style.display = "block";
        setExpanded(true);
      }
    }


    return (
      <div className="task">
        <div className="content" onClick={expandAndCollapse}>
          <div id="metadata">
            <div id="buttons">
              <button id="editButton"
                onClick={() => {
                  props.editTask(props.id);
                }}
                >
                  &#9998;
              </button>

              <button id="completeButton"
              onClick={() => {
                props.completeTask(props.id);
              }}
              >
                {/* Complete */}
                &#10003;
              </button>

              <button id="deleteButton"
              onClick={() => {
                props.deleteTask(props.id);
              }}
              >
                {/* Delete */}
                X
              </button>
            </div>
          </div>
          <h4 id="tasktitle">{props.title}</h4>
          <p id="taskdateadded">{props.dateAdded} &#160;&#x2022;&#160; Due {dayDisplay == "Today" || dayDisplay == "Tomm" ? dayDisplay : "in " + dayDisplay}</p>
          {(props.description != "" && !expanded) && <div className="taskdownarrow">&#8681;</div>}
          <p className="taskdescription" id={`taskdescription${props.id}`}>{props.description}</p>
        </div>
      </div>
    );
};

export default TodoListItem;