import './App.css';
import React from "react";
import CountdownTimer from "./Components/CountdownTimer/CountdownTimer.js";
import TodoListItem from "./Components/TodoList/TodoListItem.js";
import Navbar from "./Components/Navbar.js"

function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(0);
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
    const newTask = { title: {taskTitle}, description: {taskDescription}, deadline: {taskDeadline} };
    setTodoList([...todoList, newTask]);
    setTaskTitle("");
    setTaskDescription("");
    setDeadline(0);
  };

  const completeTask = (id) => {
    var completedTask = null;
    for(task in todoList){
      if (task.id == id) {
        completedTask = task;
        break
      }
    }
    setCompletedList([...completedList, completedTask]);
    setTodoList(
      todoList.filter((id) => {
        return task.id != id;
      })
    );

  };

  const deleteTask = (id) => {
    setTodoList(
      todoList.filter((id) => {
        return task.id != id;
      })
    );
  };

  return (
    <div className="App">
      <Navbar />
      <div className="todoList">
        {todoList.map((item) => {
          return <TodoListItem 
            title={item.title} 
            description={item.description} 
            deadline={item.deadline} 
            completeTask={completeTask} 
            deleteTask={deleteTask}
          />;
        })}
      </div>
    </div>
  );
}

export default App;
