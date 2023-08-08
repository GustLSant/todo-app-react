import React from "react"
import './TasksDisplayer.css'
import { TasksContext } from '../contexts/TasksContext'
import TasksContainer from '../components/TasksContainer/TasksContainer'
import Button01 from '../components/Button01/Button01'
import { IoAddCircle, IoSaveOutline, IoMenu } from 'react-icons/io5'


function TasksDisplayer() {
    const {tasks, setTasksData, getUniqueID} = React.useContext(TasksContext)

    function handleClickAddTask(){
        if(tasks.day !== ''){
            let newTasksData = [...tasks.data] //precisa fazer um deep copy?
            newTasksData.push(
                {
                id: getUniqueID(),
                done: false,
                title: 'New Task',
                stepTasks: []
                }
            )
            setTasksData(newTasksData)
        }
        else{
            return
        }
    }


    function handleClickArchiveTasks(){
        if(tasks.day !== ''){
            return
        }
        else{
            return
        }
    }


    return (
        <div className="tasks-displayer">
            <div className="tasks-displayer__buttons-container">
                <Button01 label={'Add Task'} onClick={handleClickAddTask} icon={<IoAddCircle size={'28px'} />} size={'1.0em'} />
                <Button01 label={'Archive Tasks'} onClick={handleClickArchiveTasks} icon={<IoSaveOutline size={'24px'} />} size={'1.0em'} />
            </div>
            {
                (tasks.day !== '') ?
                <TasksContainer /> :
                <div className="tasks-displayer__instructions-container">
                    <p>No day selected, click</p> 
                    <IoMenu />
                    <p>Icon in the top left corner to select a day and be able to manage your tasks</p>
                </div>
                
            }
        </div>
    );
}

export default TasksDisplayer;