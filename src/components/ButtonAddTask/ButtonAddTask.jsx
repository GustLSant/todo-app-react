//component criado para o component App
import React from "react"
import { TasksContext } from "../../contexts/TasksContext"
import "../Button01/Button01.css";
import { IoAddCircle } from 'react-icons/io5'

function ButtonAddTask() {
    const {tasks, setTasksData, getUniqueID} = React.useContext(TasksContext)

    function handleClick(){
        let newTasksData = [...tasks.data]
        const nextId = getUniqueID()
        newTasksData.push(
        {
            id: nextId,
            done: false,
            title: 'New Task',
            stepTasks: []
        }
        )
        setTasksData(newTasksData)
    }

    return (
        <div className="button-01" onClick={handleClick}>
            <IoAddCircle size={'28px'} />
            <p>Add Task</p>
        </div>
    );
}

export default ButtonAddTask;
