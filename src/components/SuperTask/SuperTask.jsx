import React from 'react';
import './SuperTask.css'
import { TasksContext } from '../../contexts/TasksContext';
import PropTypes from 'prop-types'
import Button01 from '../Button01/Button01';
import StepTask from '../StepTask/StepTask'
import { 
    IoCheckmarkCircle, IoCheckmarkCircleOutline, 
    IoCloseCircleOutline,
    IoSettingsOutline,
    IoAddCircleOutline,
    IoArrowUndoOutline,
} from 'react-icons/io5'

//Documentacao:



function SuperTask(props) {
    const {tasks, setTasks, getUniqueID} = React.useContext(TasksContext)
    const id = props.id
    const [done, setDone] = React.useState(props.done)
    const [title, setTitle] = React.useState(props.title)
    const [stepTasks, setStepTasks] = React.useState(props.stepTasks)
    const [isEditing, setIsEditing] = React.useState(false)
    const [deleteButtonText, setDeleteButtonText] = React.useState('Delete Task')

    const buttonIconSize = '20px'
    const buttonFontSize = '0.9em'


    function handleClickDoneButton(){
        setDone(!done)
    }


    function handleClickSaveChanges(){
        setDeleteButtonText('Delete Task')
        saveData()
        setIsEditing(false)
    }


    function handleClickCancelChanges(){
        setDone(props.done)
        setTitle(props.title)
        setStepTasks(props.stepTasks)
        setDeleteButtonText('Delete Task')
        
        setIsEditing(false)
    }


    function handleClickAddStepTask(){
        const newStepTasks = [
            ...stepTasks,
            {
                id: getUniqueID(),
                done: false,
                body: 'step task'
            }
        ]

        setStepTasks(newStepTasks)
    }

    
    function handleClickDeleteTask(){
        if(deleteButtonText === 'Delete Task'){
            setDeleteButtonText('Confirm Delete') // para evitar erros do usuario
        }
        else{
            const newTasks = []
            
            tasks.forEach(element => {
                if(element.id === id){
                    return
                }
                else{
                    newTasks.push(element)
                }
            })

            setTasks(newTasks)
        }
    }


    function saveData(){
        const newTasks = [...tasks]

        tasks.forEach(element => {
            if(element.id === id){
                element.done = done
                element.title = title
                element.stepTasks = stepTasks
            }
        })

        setTasks(newTasks)
    }

    // pra quando clicar no botao Done salvar as alteracoes
    React.useEffect(() => {
        saveData()
    }, [done])


    return (
        <div className="super-task">

            <div className="super-task__header">
                <div className="super-task-header__title-container">
                    <textarea value={title} onChange={(e) => {setTitle(e.target.value)}} disabled={!isEditing} rows={1} />
                    {
                        (done) ?
                        <IoCheckmarkCircle        size={'30px'} onClick={handleClickDoneButton} /> :
                        <IoCheckmarkCircleOutline size={'30px'} onClick={handleClickDoneButton} />
                    }
                </div>
                <div className="super-task-header__buttons-container">
                    {
                        (!isEditing) ? 
                        [
                            <Button01 key={0} label='Edit task' onClick={()=>{setIsEditing(true)}} icon={<IoSettingsOutline size={buttonIconSize} />} size={buttonFontSize}  />
                        ]
                         :
                        [
                            <Button01 key={0} label='Add step task'    onClick={handleClickAddStepTask}   icon={<IoAddCircleOutline        size={buttonIconSize} />} size={buttonFontSize} />,
                            <Button01 key={1} label={deleteButtonText} onClick={handleClickDeleteTask}    icon={<IoCloseCircleOutline      size={buttonIconSize} />} size={buttonFontSize} />,
                            <Button01 key={2} label='Save changes'     onClick={handleClickSaveChanges}   icon={<IoCheckmarkCircleOutline  size={buttonIconSize} />} size={buttonFontSize} />,
                            <Button01 key={3} label='Cancel changes'   onClick={handleClickCancelChanges} icon={<IoArrowUndoOutline        size={buttonIconSize} />} size={buttonFontSize} />
                        ]
                    }
                </div>
            </div>

            <div className="super-task__body">
                <div className="super-task-body__step-tasks-container">
                    {
                        stepTasks.map((st, key) => {
                            return(
                                <StepTask key={key} id={st.id} done={st.done} body={st.body} isEditing={isEditing} stepTasks={stepTasks} setStepTasks={setStepTasks} saveData={saveData} />
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    );
}

SuperTask.propTypes = {
    id: PropTypes.number,
    done: PropTypes.bool,
    title: PropTypes.string,
    stepTasks: PropTypes.array,
    handleUpdateTask: PropTypes.func,
}

export default SuperTask;