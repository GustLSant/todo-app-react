import React from 'react'
import './TasksContainer.css'
import { TasksContext } from '../../contexts/TasksContext'
import SuperTask from '../SuperTask/SuperTask'

//RFS:
// adicionar super task
// editar titulo da super task
// mudar 'done' da super task qnd todas as step tasks tiverem concluidas
// deletar super task
// adicionar step task da super task
// editar step task
// mudar 'done' da step task
// deletar step task



function TasksContainer() {
    const {tasks} = React.useContext(TasksContext)
    
    return (
        <div className='tasks-container'>
            <h2>{tasks.day}</h2>

            <div>
                {
                    tasks.data.map(task => {
                        return(
                            <SuperTask key={task.id}  id={task.id} done={task.done} title={task.title} stepTasks={task.stepTasks} isEditing={task.title === ""} />
                        )
                    })
                }
                {
                    ((tasks.data.length === 0) && <p>No tasks found, click &quot;Add Task&quot; button to add the first task</p>)
                }
            </div>
        </div>
    );
}

export default TasksContainer;