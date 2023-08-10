import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoListItem from "./TodoListItem.js";
import moment from "moment";
import "../../App.css"

const TodoList = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(moment().format('LL'));
  const [taskId, setTaskId] = useState(null);
  const [showInputForm, setShowInputForm] = useState(false);
  const [editing, setEditing] = useState(false);
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
      console.log(event.target.value);
      setTaskDeadline(event.target.value);
    }
  };

  const addTask = () => {
    if (!showInputForm) {
      setShowInputForm(true);
      return;
    }
    if (!taskTitle) {
      return;
    }
    if (todoList.length >= 150) {
      alert("Limit of 150 active todos reached. Please resolve some todos before adding more");
      return;
    }
    const addedId = taskId == null? uuidv4() : taskId;
    const newTask = { title: taskTitle, description: taskDescription, deadline: taskDeadline, id: addedId, dateAdded: moment().format('LL') };
    setTodoList([...todoList, newTask]);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline(moment().format('LL'));
    setTaskId(null);
    // setShowInputForm((prevShowInputForm) => !prevShowInputForm);
    setEditing(false);
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

  const editTask = (id) => {
    const filteredList = todoList.filter(item => item.id != id);
    setTodoList(filteredList);
    const editItem = todoList.find(item => item.id == id);
    setShowInputForm(true);
    setEditing(true);
    setTaskTitle(editItem.title);
    setTaskDescription(editItem.description);
    setTaskDeadline(editItem.deadline);
    setTaskId(editItem.id);
  }

  var radius = !showInputForm ? 50 : 0;
  var width = !showInputForm ? 40 : 40;
  var height = !showInputForm ? 80 : 40;


  return (
    <div id="todoList">
        <div>
          <h2 className="numtaskspending" style={{"textAlign": "center", "color": "white"}}>{todoList.length > 0? todoList.length : "No"} task{todoList.length == 1? "" : "s"} pending</h2>
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
                    editTask={editTask}
                  />
                </div>
              );
            })}
            <hr className="taskdivider" id="bottom-divider"></hr>
        </div>
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
                  required
              />
              <textarea
                  type="text"
                  placeholder="Description (optional)"
                  name="taskDescription"
                  id="taskDescription"
                  value={taskDescription}
                  onChange={handleChange}
                  style={{"maxWidth": "400px", "resize": "none"}}
              />
            </div>
            }
            <div className="form-right">
              {showInputForm && 
                <div id="taskDeadlineContainer">
                  <input
                      type="Date"
                      placeholder="Deadline"
                      name="taskDeadline"
                      id="taskDeadline"
                      value={taskDeadline}
                      onChange={handleChange}
                      style={{"width": "110px"}}
                  />
                  {/* <span id="taskDeadlineDays">days</span> */}
                </div>
              }
              <button onClick={addTask} id="addTaskButton" style={{"--r": radius, "--w": width, "height": height}}>{showInputForm? <div className="addtodotext">{!editing? "Add" : "Edit"} To-do</div> : <div className="createtaskbutton"><p className="plussign">&#65122;</p> <p>New Task</p></div>}</button>
            </div>
        </div>
        <div id="bottom-spacer"></div>
    </div>
  );
}

export default TodoList;