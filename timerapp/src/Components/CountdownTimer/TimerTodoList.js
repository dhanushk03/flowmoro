import React from "react";
import { useState, useEffect } from "react";
import TimerTodoListItem from "./TimerTodoListItem.js";
import "./TimerTodoList.css";

const TimerTodoList = (props) => {
    const [todoList, setTodoList] = useState(() => {
        let list = localStorage.getItem("todoList");
        return list ? JSON.parse(list) : [];
    });

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]);

    const completeTask = (id, e) => {
        var completedTask = null;
        todoList.forEach(item => {
          if (item.id == id) {
            completedTask = item;
          }
        });
        deleteTask(id, e);
    };
    
    const deleteTask = (id, e) => {
        setTimeout(function() {
            setTodoList(
            todoList.filter((item) => {
                return item.id != id;
            })
            );
        }, 200);
        e.stopPropagation();
    };
    
    
    return (
        <div className="timertodolist">
            <h3 style={{"textAlign": "center"}}>Click on the tasks you're working on. &#10003; them off when completed.</h3>
            {/* <hr style={{height:"1px"}}></hr> */}
            {todoList.map((item) => {
                return (
                    <div>
                        <TimerTodoListItem
                            title={item.title}
                            deadline={item.deadline}
                            id={item.id}
                            updateActive={props.updateActive}
                            isActive={props.isActive}
                            completeTask={completeTask}
                            incrementCompleted={props.incrementCompleted}
                        />
                    </div>
                    );}
                )
            }
        </div>
    );
}

export default TimerTodoList;