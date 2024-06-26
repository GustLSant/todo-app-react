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
    const {tasks, setTasksData, getUniqueID} = React.useContext(TasksContext)
    const id = props.id
    const [done, setDone] = React.useState(props.done)
    const [title, setTitle] = React.useState(props.title)
    const [stepTasks, setStepTasks] = React.useState(props.stepTasks)
    const [isEditing, setIsEditing] = React.useState(props.isEditing)
    const [deleteButtonText, setDeleteButtonText] = React.useState('Delete Task')
    const [cancelButtonText, setCancelButtonText] = React.useState('Cancel Changes')

    const buttonIconSize = '20px'
    const buttonFontSize = '0.9em'
    const textAreaRef = React.useRef(null)
    const divRef = React.useRef(null)


    function handleClickDoneButton(){
        setDone(!done)
    }
    

    // atualiza o conteudo do text area e redimensiona sua altura de acordo com a demanda
    function handleTitleChange(e){
        if(e.target.value.includes('\n')){ textAreaRef.current.blur(); return; } /* ao pressionar Enter, para de editar */
        setTitle(e.target.value)
        textAreaRef.current.style.height = '1.0em'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }

    // para o textarea ficar com a altura desejada ao renderizar a pegina
    React.useEffect(()=>{
        textAreaRef.current.style.height = '1.0em'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }, [])


    function handleClickSaveChanges(){
        setDeleteButtonText('Delete Task')
        setCancelButtonText('Cancel Changes')
        saveData()
        setIsEditing(false)
    }


    function handleClickCancelChanges(){
        if(cancelButtonText === 'Cancel Changes'){
            setCancelButtonText('Confirm Cancel Changes')
        }
        else{
            setDone(props.done)
            setTitle(props.title)
            setStepTasks(props.stepTasks)
            setDeleteButtonText('Delete Task')
            
            setIsEditing(false)
            setCancelButtonText('Cancel Changes')
        }
    }


    function handleClickAddStepTask(){
        const newStepTasks = [
            ...stepTasks,
            {
                id: getUniqueID(),
                done: false,
                body: ''
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
            
            tasks.data.forEach(element => {
                if(element.id === id){
                    return
                }
                else{
                    newTasks.push(element)
                }
            })

            divRef.current.classList.add('been-deleted')

            setTimeout(()=>{setTasksData(newTasks)}, 400)
        }
    }


    function handleStDoneChange(newStepTasks){
        let isAllDone = true
        newStepTasks.forEach((stepTask)=>{
            if(!stepTask.done){
                isAllDone = false
            }
        })
        setDone(isAllDone)
    }


    function saveData(){
        const newTasksData = [...tasks.data] //precisa fazer um deep copy?

        tasks.data.forEach(element => {
            if(element.id === id){
                element.done = done
                element.title = title
                element.stepTasks = stepTasks
            }
        })

        setTasksData(newTasksData)
    }

    // pra quando clicar no botao Done salvar as alteracoes
    React.useEffect(() => {
        saveData()
    }, [done])


    React.useEffect(() => {
        if(isEditing){
            textAreaRef.current.focus()
            textAreaRef.current.setSelectionRange(textAreaRef.current.value.length, textAreaRef.current.value.length)
        }
    }, [isEditing])


    return (
        <div className={`super-task ${(done) ? "done" : ""}`} ref={divRef}>

            <div className="super-task__header">
                <div className="super-task-header__title-container">
                    <textarea value={title} onChange={(e)=>{handleTitleChange(e)}} ref={textAreaRef} disabled={!isEditing} placeholder='New Task' name='super-task-textarea' />
                    {
                        (done) ?
                        <IoCheckmarkCircle        size={'30px'} onClick={handleClickDoneButton} /> :
                        <IoCheckmarkCircleOutline size={'30px'} onClick={handleClickDoneButton} />
                    }
                </div>
                
                { (!isEditing) && <Button01 key={0} label='Edit task' onClick={()=>{setIsEditing(true)}} icon={<IoSettingsOutline size={buttonIconSize} />} size={buttonFontSize}  /> }
            </div>

            <div className="super-task__body">
                <div className="super-task-body__step-tasks-container">
                    {
                        stepTasks.map((st, key) => {
                            return(
                                <StepTask key={key} id={st.id} done={st.done} body={st.body} isEditing={isEditing} stepTasks={stepTasks} setStepTasks={setStepTasks} superTaskHandleSTDoneChange={handleStDoneChange} saveData={saveData} />
                            )
                        })
                    }
                    {
                        ((stepTasks.length === 0) && <p>No step tasks found, click on the &quot;Edit Task&quot; button to be able to add step tasks</p>)
                    }
                </div>
            </div>

            <div className="super-task-header__buttons-container">
                {
                    (isEditing) &&
                    [
                        <Button01 key={2} label='Save changes'     onClick={handleClickSaveChanges}   icon={<IoCheckmarkCircleOutline  size={buttonIconSize} />} size={buttonFontSize} />,
                        <Button01 key={3} label={cancelButtonText} onClick={handleClickCancelChanges} icon={<IoArrowUndoOutline        size={buttonIconSize} />} size={buttonFontSize} isDangerous={(cancelButtonText === 'Confirm Cancel Changes')} />,
                        <Button01 key={0} label='Add step task'    onClick={handleClickAddStepTask}   icon={<IoAddCircleOutline        size={buttonIconSize} />} size={buttonFontSize} />,
                        <Button01 key={1} label={deleteButtonText} onClick={handleClickDeleteTask}    icon={<IoCloseCircleOutline      size={buttonIconSize} />} size={buttonFontSize} isDangerous={(deleteButtonText === 'Confirm Delete')} />,
                    ]
                }
            </div>

            {
                (isEditing && <p className="p-edit-instructions">Click &quot;Save changes&quot; or &quot;Cancel changes&quot; to stop editing</p>)
            }
            
        </div>
    );
}

SuperTask.propTypes = {
    id: PropTypes.number,
    done: PropTypes.bool,
    title: PropTypes.string,
    stepTasks: PropTypes.array,
    handleUpdateTask: PropTypes.func,
    isEditing: PropTypes.bool
}

export default SuperTask;