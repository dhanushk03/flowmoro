import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoListItem from "./TodoListItem.js";
import "../../App.css"

const TodoList = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(0);
  const [showInputForm, setShowInputForm] = useState(false);
  const [todoList, setTodoList] = useState(() => {
    const localData = localStorage.getItem('todoList');
    return localData ? JSON.parse(localData) : [];
  });
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event) => {
    if (event.target.name === "taskTitle") {
      setTaskTitle(event.target.value);
    } else if (event.target.name == "taskDescription") {
      setTaskDescription(event.target.value);
    } else {
      setTaskDeadline(Number(event.target.value));
    }
  };

  const addTask = () => {
    if (!showInputForm) {
      setShowInputForm((prevShowInputForm) => !prevShowInputForm);
      return;
    }
    const newTask = { title: taskTitle, description: taskDescription, deadline: taskDeadline, id: uuidv4(), dateAdded: new Date().toLocaleDateString() };
    setTodoList([newTask, ...todoList]);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline(0);
    setShowInputForm((prevShowInputForm) => !prevShowInputForm);
  };

  const completeTask = (id) => {
    var completedTask = null;
    todoList.forEach(item => {
      if (item.id == id) {
        completedTask = item;
      }
    });
    setCompletedList([completedTask, ...completedList]);
    deleteTask(id);
  };

  const deleteTask = (id) => {
    setTimeout(function() {
      setTodoList(
        todoList.filter((item) => {
          return item.id != id;
        })
      );
    }, 200)
  };

  var radius = !showInputForm ? 50 : 0;
  var width = !showInputForm ? 40 : 40;
  var height = !showInputForm ? 40 : 20;

  return (
    <div id="todoList">
        <div id="addTaskForm">
            {showInputForm &&
            <div className="form-left">
              <input
                  type="text"
                  placeholder="Title"
                  name="taskTitle"
                  id="taskTitle"
                  value={taskTitle}
                  onChange={handleChange}
              />
              <textarea
                  type="text"
                  placeholder="Description (optional)"
                  name="taskDescription"
                  id="taskDescription"
                  value={taskDescription}
                  onChange={handleChange}
              />
            </div>
            }
            <div className="form-right">
              {showInputForm && 
                <div id="taskDeadlineContainer">
                  <input
                      type="Number"
                      placeholder="Deadline"
                      name="taskDeadline"
                      id="taskDeadline"
                      value={taskDeadline}
                      onChange={handleChange}
                  />
                  <span id="taskDeadlineDays">days</span>
                </div>
              }
              <button onClick={addTask} id="addTaskButton" style={{"--r": radius, "--w": width, "--h": height}}>{showInputForm? <div className="addtodotext">Add To-do</div> : <div className="createtaskbutton"><p className="plussign">&#65122;</p> <p>Add task</p></div>}</button>
            </div>
        </div>
        <div id="taskList">
            {todoList.map((item) => {

              return (
                <div>
                  <hr className="taskdivider"></hr>
                  <TodoListItem 
                    title={item.title} 
                    description={item.description} 
                    deadline={item.deadline} 
                    id={item.id}
                    dateAdded={item.dateAdded}
                    completeTask={completeTask} 
                    deleteTask={deleteTask}
                  />
                </div>
              );
            })}
            <hr className="taskdivider" id="bottom-divider"></hr>
            {todoList.length == 0 && <h1 id="emptymessage">No items pending</h1>}
        </div>
        <div id="bottom-spacer"></div>
    </div>
  );
}

export default TodoList;