import React from "react"
import { TasksContext } from '../contexts/TasksContext'
import TasksContainer from '../components/TasksContainer/TasksContainer'
import Button01 from '../components/Button01/Button01'
import { IoAddCircle, IoSaveOutline, IoDocumentsOutline } from 'react-icons/io5'


function TasksDisplayer() {
    const {tasks, setTasksData, getUniqueID} = React.useContext(TasksContext)
    const taskDisplayerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '20px 0px',
    }
    const buttonsContainerStyles = {
        display: 'flex',
        gap: '20px',
    }

    function handleClickAddTask(){
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


    function handleClickArchiveTasks(){
    
    }


    function handleClickExportTasks(){

    }


    return (
        <div className="tasks-displayer" style={taskDisplayerStyles}>
            <div className="tasks-displayer__buttons-container" style={buttonsContainerStyles}>
                <Button01 label={'Add Task'} onClick={handleClickAddTask} icon={<IoAddCircle size={'28px'} />} size={'1.0em'} />
                <Button01 label={'Archive Tasks'} onClick={handleClickArchiveTasks} icon={<IoSaveOutline size={'24px'} />} size={'1.0em'} />
                <Button01 label={'Export Tasks'} onClick={handleClickExportTasks} icon={<IoDocumentsOutline size={'24px'} />} size={'1.0em'} />
            </div>
            <TasksContainer />
        </div>
    );
}

export default TasksDisplayer;