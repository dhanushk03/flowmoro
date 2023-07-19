import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./Components/Navbar.js";
import Home from "./Components/Home/Home.js";
import CountdownTimer from "./Components/CountdownTimer/CountdownTimer.js";
import TodoList from "./Components/TodoList/TodoList.js";
import News from "./Components/News/News.js"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<CountdownTimer />} />
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
