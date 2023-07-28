import React from "react";

const TimerTodoList = () => {
    const [todoList, setTodoList] = useState(() => {
        let list = localStorage.getItem("todoList");
        return list ? JSON.parse(list) : []
    });
    return (
        <h1>TimerTodoList</h1>
    );
}

export default TimerTodoList;