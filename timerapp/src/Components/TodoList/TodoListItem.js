import React from "react";
import moment from "moment";
import { useState } from "react";
import "./TodoListItem.css";

const TodoListItem = (props) => {
    const [expanded, setExpanded] = useState(false);
    var dayDisplay = moment(props.deadline).format("LL");

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
          <h4 className="tasktitle" style={{"maxWidth": "400px"}}>{props.title}</h4>
          <h5 className="taskdateadded">Added {props.dateAdded} &#160;&#x2022;&#160; Due {dayDisplay}</h5>
          {(props.description != "" && !expanded) && <div className="taskdownarrow">&#8681;</div>}
        </div>
        <p className="taskdescription" id={`taskdescription${props.id}`}>{props.description}</p>
      </div>
    );
};

export default TodoListItem;