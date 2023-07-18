import React from "react";
import { useState, useEffect } from "react";
import "./TodoListItem.css";

const TodoListItem = (props) => {
    return (
      <div className="task">
        <div className="content">
          <div id="metadata">
            <h3 id="taskdeadline">{props.deadline} days</h3>
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
          <p id="taskdescription">{props.description}</p>
        </div>
      </div>
    );
};

export default TodoListItem;