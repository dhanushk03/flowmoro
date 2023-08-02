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

    function expandAndCollapseDescription() {
      var desc = document.getElementById(`taskdescription${props.id}`);
      if (desc.style.display == "block") {
        desc.style.display = "none";
        setExpanded(false);
      } else {
        desc.style.display = "block";
        setExpanded(true);
      }
    }

    function expandButtons() {
      var desc = document.getElementById(`buttons${props.id}`);
      desc.style.visibility = "visible";
      // desc.style.display = "flex";
    }

    function collapseButtons() {
      var desc = document.getElementById(`buttons${props.id}`);
      desc.style.visibility = "hidden";
      // desc.style.display = "none";
    }


    return (
      <div className="task">
        <div className="content" onClick={() => {expandAndCollapseDescription();}} onMouseEnter={expandButtons} onMouseLeave={collapseButtons}>
          <div className="metadata">
            <div className="buttons" id={`buttons${props.id}`}>
              <button className="editButton"
                onClick={() => {
                  props.editTask(props.id);
                }}
                >
                  &#9998;
              </button>

              <button className="completeButton"
              onClick={() => {
                props.completeTask(props.id);
              }}
              >
                {/* Complete */}
                &#10003;
              </button>

              <button className="deleteButton"
              onClick={() => {
                props.deleteTask(props.id);
              }}
              >
                {/* Delete */}
                X
              </button>
            </div>
          </div>
          <h4 className="tasktitle">{props.title}</h4>
          <p className="taskdateadded">{props.dateAdded} &#160;&#x2022;&#160; <b style={{"color": "orange"}}>Due {dayDisplay == "Today" || dayDisplay == "Tomm" ? dayDisplay : "in " + dayDisplay}</b></p>
          {(props.description != "" && !expanded) && <div className="taskdownarrow">&#8681;</div>}
          <p className="taskdescription" id={`taskdescription${props.id}`}>{props.description}</p>
        </div>
      </div>
    );
};

export default TodoListItem;