import React from 'react'
import './DayOfWeek.css'
import { TasksContext } from '../contexts/TasksContext'
import SuperTask from '../components/SuperTask/SuperTask'

//RFS:
// adicionar super task
// editar titulo da super task
// mudar 'done' da super task qnd todas as step tasks tiverem concluidas
// deletar super task
// adicionar step task da super task
// editar step task
// mudar 'done' da step task
// deletar step task





function Monday() {
    const {tasks} = React.useContext(TasksContext)
    
    return (
        <div className='day-of-week'>
            <h2 onClick={()=>{console.log(tasks)}}>Monday</h2>

            <div className="tasks-container">
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

export default Monday;