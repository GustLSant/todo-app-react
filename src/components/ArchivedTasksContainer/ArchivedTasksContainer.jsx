import React from 'react'
import './ArchivedTasksContainer.css'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import ArchivedTask from '../ArchivedTask/ArchivedTask'
import Button01 from '../Button01/Button01'
import { 
    IoCheckmarkCircleOutline, 
    IoSettingsOutline,
    IoArrowUndoOutline,
} from 'react-icons/io5'


function ArchivedTasksContainer() {
    const { day } = useParams()
    const [superTasks, setSuperTasks] = React.useState([])
    const [selectedDay, setSelectedDay] = React.useState('')
    const [isEditing, setIsEditing] = React.useState(false)
    const navigate = useNavigate()
    const buttonSize = '15px'
    const buttonIconSize = '18px'
    const dayWithBars = day.replace(/-/g, "/")


    React.useEffect(()=>{
        getSuperTasksFromLS()
    }, [])


    function getSuperTasksFromLS(){
        let tasks = JSON.parse(localStorage.getItem('archivedTasks'))[dayWithBars]
        
        if(tasks){
            setSuperTasks([...tasks])
            setSelectedDay(formatDay(dayWithBars))
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
        return navigate('/archived-tasks')
    }


    function handleClickSaveChanges(){
        setIsEditing(false)

        const LSObject = JSON.parse(localStorage.getItem('archivedTasks'))
        
        const newLSObject = {}

        Object.keys(LSObject).forEach((_day)=>{
            if(_day === dayWithBars){
                newLSObject[dayWithBars] = superTasks
            }
            else{
                newLSObject[_day] = LSObject[_day]
            }
        })

        // Array.from(document.getElementsByClassName('archived-task')).forEach((element)=>{
        //     element.classList.add('been-deleted')
        // })

        setTimeout(()=>{
            localStorage.setItem('archivedTasks', JSON.stringify(newLSObject))
        }, 400) //125ms eh o tempo de animacao padrao definido como variavel no index.css
    }


    function handleClickCancelChanges(){
        setIsEditing(false)
        getSuperTasksFromLS()
    }


    function handleClickTask(_taskId, _element){
        if(isEditing){
            const newSuperTasks = []

            superTasks.forEach((task)=>{
                if(task.id !== _taskId){
                    newSuperTasks.push(task)
                }
            })

            _element.classList.add('been-deleted')
            setTimeout(()=>{setSuperTasks(newSuperTasks)}, 400)
        }
    }
    

    return (
        <div className="at-container">
            <div className="at-container__buttons-container">
                <Button01 label={'Return'} icon={<IoArrowUndoOutline size={buttonIconSize} />} onClick={handleClickReturnTasksDisplayer} />
                <div className="at-buttons-container__buttons-edit">
                    {
                        (!isEditing) ? 
                        [
                            <Button01 key={0} label='Edit' onClick={()=>{if(superTasks.length>0){setIsEditing(true)}}} icon={<IoSettingsOutline size={buttonIconSize} />} size={buttonSize}  />
                        ]
                            :
                        [
                            <Button01 key={1} label={'Save Changes'}    onClick={handleClickSaveChanges}   icon={<IoCheckmarkCircleOutline size={buttonIconSize} />} size={buttonSize} />,
                            <Button01 key={2} label={'Cancel Changes'}  onClick={handleClickCancelChanges} icon={<IoArrowUndoOutline size={buttonIconSize} />} size={buttonSize} />
                        ]
                    }
                </div>
            </div>

            <h2>{selectedDay}</h2>

            {(isEditing && <p className='at__edit-instructions fade-in-left'>Click on the task you want to remove</p>)}
            {(superTasks.length === 0) ? <p className='fade-in-left'>There&lsquo;s nothing saved from this date {day}</p> : ''}

            <div className="at-container__tasks-container">
                {
                    superTasks.map((task, idx)=>{
                        return(
                            <ArchivedTask key={idx} title={task.title} stepTasks={task.stepTasks} isEditing={isEditing} id={task.id} onClick={handleClickTask} />
                        )
                    })
                }
            </div> 
        </div>
    )
}

export default ArchivedTasksContainer;