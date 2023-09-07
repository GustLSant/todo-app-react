import React from 'react'
import './ArchivedTasksDisplayer.css'
import { useNavigate } from "react-router-dom"
import Button01 from '../components/Button01/Button01'
import { 
    IoCheckmarkCircleOutline, 
    IoSettingsOutline,
    IoArrowUndoOutline,
} from 'react-icons/io5'


function ArchivedTasksDisplayer(){
    const [days, setDays] = React.useState(getDaysFromLocalStorage())
    const [isEditing, setIsEditing] = React.useState(false)
    const navigate = useNavigate()
    const buttonSize = '15px'
    const buttonIconSize = '18px'

    
    function getDaysFromLocalStorage(){
        if(localStorage.getItem('archivedTasks')){
            return Object.keys(JSON.parse(localStorage.getItem('archivedTasks')))
        }
        else{
            return []
        }
    }


    function handleClickDay(_day){
        if(!isEditing){
            return navigate(`/archived-tasks/${_day.replace(/\//g, "-")}`)
        }
        else{
            const newDays = []
            
            days.forEach((day)=>{
                if(day !== _day){
                    newDays.push(day)
                }
            })
            
            setDays(newDays)
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


    function handleClickSaveChanges(){
        setIsEditing(false)
        
        const newArchivedTasks = JSON.parse(localStorage.getItem('archivedTasks'))

        Object.keys(newArchivedTasks).forEach((dayInLocalStorage)=>{
            let found = false
            
            days.forEach((day)=>{
                if(dayInLocalStorage === day){
                    found = true
                    return
                }
            })

            if(!found){
                delete newArchivedTasks[dayInLocalStorage]
            }
        })

        localStorage.setItem('archivedTasks', JSON.stringify(newArchivedTasks))
    }

    function handleClickCancelChanges(){
        setIsEditing(false)
        setDays(getDaysFromLocalStorage)
    }


    return (
        <div className="at-displayer">
            <div className='at-displayer__header'>
                <div className='at-displayer-header__text-container'>
                    <h2>Archived Tasks</h2>
                    <p>Format: yyyy/mm/dd</p>
                </div>
                
                <div className='at-displayer-header__buttons-container'>
                    {
                        (!isEditing) ? 
                        [
                            <Button01 key={0} label='Edit' onClick={()=>{setIsEditing(true)}} icon={<IoSettingsOutline size={buttonIconSize} />} size={buttonSize}  />
                        ]
                         :
                        [
                            <Button01 key={1} label={'Save Changes'}    onClick={handleClickSaveChanges}   icon={<IoCheckmarkCircleOutline size={buttonIconSize} />} size={buttonSize} />,
                            <Button01 key={2} label={'Cancel Changes'}  onClick={handleClickCancelChanges} icon={<IoArrowUndoOutline size={buttonIconSize} />} size={buttonSize} />
                        ]
                    }
                    
                </div>
            </div>

            {(isEditing && <p className='at__edit-instructions fade-in-left'>Click on the day you want to remove</p>)}
            
            <div className="at-displayer__days-container">
                {
                    days.map((day, id)=>{
                        return(
                            <div key={id} className={`at__day fade-in-top ${(isEditing) ? 'editing' : ''}`} onClick={()=>{handleClickDay(day)}}>{formatDay(day)}</div>
                        )
                    })
                }
            </div>

            {
                ((days.length === 0)) && <p className='at__add-instructions fade-in-left'>No archived tasks found. With a day selected, click &quot;Archive Tasks&quot; button to archive the first task.</p>
            }
        </div>
    )
}

export default ArchivedTasksDisplayer;