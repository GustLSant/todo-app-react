import React from 'react'
import './ArchivedTasksContainer.css'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import ArchivedTask from '../ArchivedTask/ArchivedTask'
import Button01 from '../Button01/Button01'
import { IoArrowUndoOutline } from 'react-icons/io5'



function ArchivedTasksContainer() {
    const { day } = useParams()
    const [superTasks, setSuperTasks] = React.useState([])
    const [selectedDay, setSelectedDay] = React.useState('')
    const navigate = useNavigate()


    React.useEffect(()=>{
        let dayWithBars = day.replace(/-/g, "/")

        let tasks = JSON.parse(localStorage.getItem('archivedTasks'))[dayWithBars]
        
        if(tasks){
            setSuperTasks([...tasks])
            setSelectedDay(formatDay(dayWithBars))
        }
    }, [])


    function formatDay(_str){
        let splittedArray = _str.split('/')
        splittedArray.map((s, idx)=>{
            if(s.length < 2){
                splittedArray[idx] = '0' + s
            }
        })
        return splittedArray[0] + ' / ' + splittedArray[1] + ' / ' + splittedArray[2]
    }


    function handleClickReturnTasksDisplayer(){
        return navigate('/archived-tasks')
    }


    return (
        <div className="at-container">
            <Button01 label={'Return'} icon={<IoArrowUndoOutline size={'1.4em'} />} onClick={handleClickReturnTasksDisplayer} />
            <h2>{selectedDay}</h2>

            <div className="at-container__tasks-container">
                {
                    superTasks.map((task, id)=>{
                        return(
                            <ArchivedTask key={id} title={task.title} stepTasks={task.stepTasks} />
                        )
                    })
                }
            </div> 
        </div>
    );
}

export default ArchivedTasksContainer;