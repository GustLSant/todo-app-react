//component criado para o component App
import React from "react"
import { TasksContext } from "../../contexts/TasksContext"
import "../Button01/Button01.css";
import { IoAddCircle } from 'react-icons/io5'

function ButtonAddTask() {
    const {tasks, setTasks, getUniqueID} = React.useContext(TasksContext)

    function handleClick(){
        let newTasks = [...tasks]
        const nextId = getUniqueID()
        newTasks.push(
        {
            id: nextId,
            done: false,
            title: 'New Task',
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
