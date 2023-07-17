import React from "react";
import { useState, useEffect } from "react";
import "./TodoListItem.css";

const TodoTask = (props) => {
    return (
      <div className="task">
        <div className="content">
          <h1>{props.title}</h1>
          <h3>{props.description}</h3>
          <h4>{props.deadline}</h4>
        </div>
        <button
          onClick={() => {
            props.completeTask(props.id);
          }}
        >
          Complete
        </button>
        <button
          onClick={() => {
            props.deleteTask(props.id);
          }}
        >
          Delete
        </button>
      </div>
    );
};