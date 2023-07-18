import React from "react";
import { useState } from "react";
import TodoListItem from "./TodoListItem.js";

const TodoList = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(0);
  const [currIdNum, setCurrIdNum] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

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
    const newTask = { title: taskTitle, description: taskDescription, deadline: taskDeadline, id: currIdNum };
    setTodoList([...todoList, newTask]);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline(0);
    setCurrIdNum((prevIdNum) => prevIdNum + 1)
  };

  const completeTask = (id) => {
    var completedTask = null;
    todoList.forEach(item => {
      if (item.id == id) {
        completedTask = item;
      }
    });
    setCompletedList([...completedList, completedTask]);
    deleteTask(id);
  };

  const deleteTask = (id) => {
    setTodoList(
      todoList.filter((item) => {
        return item.id != id;
      })
    );
  };

  return (
    <div id="todoList">
        <div id="form">
        <input
            type="text"
            placeholder="Title"
            name="taskTitle"
            value={taskTitle}
            onChange={handleChange}
        />
        <input
            type="text"
            placeholder="Description"
            name="taskDescription"
            value={taskDescription}
            onChange={handleChange}
        />
        <input
            type="number"
            placeholder="Deadline (in Days)"
            name="taskDeadline"
            value={taskDeadline}
            onChange={handleChange}
        />
        <button onClick={addTask}>Add Task</button>
        </div>
        {todoList.map((item) => {
        return <TodoListItem 
            title={item.title} 
            description={item.description} 
            deadline={item.deadline} 
            id={item.id}
            completeTask={completeTask} 
            deleteTask={deleteTask}
        />;
        })}
    </div>
  );
}

export default TodoList;