import React from "react";
import PropTypes from 'prop-types'
import { IoCheckmarkCircle, IoCheckmarkCircleOutline, IoCloseCircle, IoCloseCircleOutline } from 'react-icons/io5'


function StepTask(props){
    
    function handleBodyChange(e){
        const newStepTasks = JSON.parse(JSON.stringify(props.stepTasks)); // deep copy
        
        newStepTasks.forEach(element => {
            if(element.id === props.id){
                element.body = e.target.value //ta fazendo essa alteracao no tasks sem nem mesmo chamar o setTasks
            }
        })

        props.setStepTasks(newStepTasks)
    }
    

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
            <textarea value={props.body} onChange={(e)=>{handleBodyChange(e)}} disabled={!props.isEditing} rows={1} />
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