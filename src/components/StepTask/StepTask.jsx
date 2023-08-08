import React from 'react'
import './StepTask.css'
import PropTypes from 'prop-types'
import { IoCheckmarkCircle, IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'


function StepTask(props){
    const textAreaRef = React.useRef(null)


    function handleBodyChange(e){
        const newStepTasks = JSON.parse(JSON.stringify(props.stepTasks)); // deep copy
        
        newStepTasks.forEach(element => {
            if(element.id === props.id){
                element.body = e.target.value //ta fazendo essa alteracao no tasks sem nem mesmo chamar o setTasks
            }
        })

        props.setStepTasks(newStepTasks)

        textAreaRef.current.style.height = '1.0em'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
    
    React.useEffect(()=>{
        textAreaRef.current.style.height = '1.0em'
        console.log(textAreaRef.current.scrollHeight)
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }, [])


    function handleClickDelete(){
        const newStepTasks = []
        
        props.stepTasks.forEach(element => {
            if(element.id !== props.id){
                newStepTasks.push(element)
            }
        })

        props.setStepTasks(newStepTasks)
    }


    function handleToggleDone(){
        const newStepTasks = [...props.stepTasks]
        
        props.stepTasks.forEach(element => {
            if(element.id === props.id){
                element.done = !props.done
            }
        })
        
        props.setStepTasks(newStepTasks)
        props.saveData()
    }


    return(
        <div className="step-task">
            <textarea value={props.body} onChange={(e)=>{handleBodyChange(e)}} ref={textAreaRef} disabled={!props.isEditing} />
            {
                (props.isEditing) ?
                <IoCloseCircleOutline size={'30px'} onClick={handleClickDelete} /> :
                [
                    (props.done) ?
                    <IoCheckmarkCircle        key={0} size={'30px'} onClick={handleToggleDone} /> :
                    <IoCheckmarkCircleOutline key={1} size={'30px'} onClick={handleToggleDone} />
                ]
            }
        </div>
    );
}

StepTask.propTypes = {
    id: PropTypes.number,
    done: PropTypes.bool,
    body: PropTypes.string,
    isEditing: PropTypes.bool,
    stepTasks: PropTypes.array,
    setStepTasks: PropTypes.func,
    saveData: PropTypes.func,
}

export default StepTask;