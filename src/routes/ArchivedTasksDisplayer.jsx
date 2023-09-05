import React from 'react'
import './ArchivedTasksDisplayer.css'
import Button01 from '../components/Button01/Button01'
import { useNavigate } from "react-router-dom"
import { IoCheckmarkCircle, IoArrowUndoOutline } from 'react-icons/io5'


function ArchivedTasksDisplayer(){
    const [superTasks, setSuperTasks] = React.useState([])
    const [days] = React.useState(
        (localStorage.getItem('archivedTasks')) ?
        Object.keys(JSON.parse(localStorage.getItem('archivedTasks'))) :
        []
    )
    const [selectedDay, setSelectedDay] = React.useState('')
    const navigate = useNavigate()


    function handleClickDay(_day){
        return navigate(`/archived-tasks/${_day.replace(/\//g, "-")}`)
        let a = JSON.parse(localStorage.getItem('archivedTasks'))[_day]
        if(a){
            setSuperTasks([...a])
            setSelectedDay(formatDay(_day))
        }
    }


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
        setSuperTasks([])
    }


    return (
        <div className="at-displayer">
            <h2>Archived Tasks</h2>
            <p>Format: yyyy/mm/dd</p>
            
            <div className="at-displayer__days-container">
                {
                    days.map((day, id)=>{
                        return(
                            <div key={id} className="at__day fade-in-top" onClick={()=>{handleClickDay(day)}}>{formatDay(day)}</div>
                        )
                    })
                }
            </div>

            {
                ((days.length === 0)) && <p>No archived tasks found. With a day selected, click &quot;Archive Tasks&quot; button to archive the first task.</p>
            }

            <div className={`at__tasks-displayer ${(superTasks.length > 0) ? 'visible' : ''}`}>
                <Button01 label={'Return'} icon={<IoArrowUndoOutline size={'1.4em'} />} onClick={handleClickReturnTasksDisplayer} />
                <h2>{selectedDay}</h2>

                <div className="at__tasks-container">
                    {
                        superTasks.map((task, id)=>{
                            return(
                                <div key={id} className="st__task">
                                    <div>
                                        <div className='st-task__header'>
                                            <h3>Title:</h3>
                                            <IoCheckmarkCircle />
                                        </div>
                                        <p>{task.title}</p>
                                    </div>
                                    <div>
                                        <h3>StepTasks:</h3>
                                        {
                                            task.stepTasks.map((st, id)=>{
                                                return(
                                                    <p key={id}>
                                                        {st.body}
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ArchivedTasksDisplayer;