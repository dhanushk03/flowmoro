import './App.css';
import React from "react";
import { useState } from "react";
import CountdownTimer from "./Components/CountdownTimer/CountdownTimer.js";
import TodoList from "./Components/TodoList/TodoList.js";
import TodoListItem from "./Components/TodoList/TodoListItem.js";
import Navbar from "./Components/Navbar.js"

function App() {
  return (
    <div className="App">
      <Navbar />
      {<CountdownTimer />}
      {/*<TodoList />*/}
    </div>
  );
}

export default App;
