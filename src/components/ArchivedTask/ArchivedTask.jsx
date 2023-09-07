import React from 'react'
import './ArchivedTask.css'
import PropTypes from 'prop-types';
import { IoCheckmarkCircle } from 'react-icons/io5'


function ArchivedTask(props){
    const selfRef = React.useRef(null)

    
    return (
        <div className={`archived-task ${props.id} ${(props.isEditing)?'editing':''}`} ref={selfRef} onClick={()=>{props.onClick(props.id, selfRef.current)}}>
            <div>
                <div className='archived-task__header'>
                    <h3>Title:</h3>
                    <IoCheckmarkCircle />
                </div>
                <p>
                    {(props.title === '') ? '-' : props.title}
                </p>
                
            </div>
            <div>
                <h3>StepTasks:</h3>
                {
                    props.stepTasks.map((st, idx)=>{
                        return(
                            <p key={idx}>
                                {st.body}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

ArchivedTask.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    stepTasks: PropTypes.array,
    isEditing: PropTypes.bool,
    onClick: PropTypes.func,
}

export default ArchivedTask