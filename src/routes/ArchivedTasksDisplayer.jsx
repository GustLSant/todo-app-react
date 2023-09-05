import React from 'react'
import './ArchivedTasksDisplayer.css'
import { useNavigate } from "react-router-dom"


function ArchivedTasksDisplayer(){
    const [days] = React.useState(
        (localStorage.getItem('archivedTasks')) ?
        Object.keys(JSON.parse(localStorage.getItem('archivedTasks'))) :
        []
    )
    const navigate = useNavigate()


    function handleClickDay(_day){
        return navigate(`/archived-tasks/${_day.replace(/\//g, "-")}`)
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
        </div>
    )
}

export default ArchivedTasksDisplayer;