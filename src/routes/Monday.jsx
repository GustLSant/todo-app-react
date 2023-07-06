import React from 'react'
import './DayOfWeek.css'
import Task from '../components/Task/Task'



function Monday() {

    const tasks = [
        {
            id: 1,
            done: false,
            title: 'Title',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque deserunt id accusantium numquam vitae? Beatae voluptates nesciunt tempore ratione eligendi? Perferendis earum accusantium optio culpa debitis, perspiciatis quibusdam pariatur unde!',
        }
    ]

    return (
        <div className='day-of-week'>
            <h2>Monday</h2>
            
            <div className="tasks-container">
                {
                    tasks.map(task => {
                        return(
                            <Task key={task.id} done={task.done} title={task.title} body={task.body} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Monday;