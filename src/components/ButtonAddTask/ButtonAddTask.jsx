//component criado para o component App
import React from "react"
import { TasksContext } from "../../contexts/TasksContext"
import "../Button01/Button01.css";
import { IoAddCircle } from 'react-icons/io5'

function ButtonAddTask() {
    const {tasks, setTasks} = React.useContext(TasksContext)

    function handleClick(){
        let newTasks = [...tasks]
        const nextId = newTasks.length
        newTasks.push(
        {
            id: nextId,
            done: false,
            title: 'New Task ' + (nextId + 1),
            stepTasks: []
        }
        )
        setTasks(newTasks)
    }

    return (
        <div className="button-01" onClick={handleClick}>
            <IoAddCircle size={'28px'} />
            <p>Add Task</p>
        </div>
    );
}

export default ButtonAddTask;
