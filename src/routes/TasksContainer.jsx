import React from 'react'
import './TasksContainer.css'
import { TasksContext } from '../contexts/TasksContext'
import SuperTask from '../components/SuperTask/SuperTask'
import PropTypes from 'prop-types'

//RFS:
// adicionar super task
// editar titulo da super task
// mudar 'done' da super task qnd todas as step tasks tiverem concluidas
// deletar super task
// adicionar step task da super task
// editar step task
// mudar 'done' da step task
// deletar step task



function TasksContainer(props) {
    const {tasks} = React.useContext(TasksContext)
    
    return (
        <div className='tasks-container'>
            <h2 onClick={()=>{console.log(tasks)}}>{props.day}</h2>

            <div>
                {
                    tasks.map(task => {
                        return(
                            <SuperTask key={task.id} id={task.id} done={task.done} title={task.title} stepTasks={task.stepTasks} />
                        )
                    })
                }
            </div>
        </div>
    );
}

TasksContainer.propTypes = {
    day: PropTypes.string,
}

export default TasksContainer;