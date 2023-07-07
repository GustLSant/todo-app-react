import React from 'react'
import './Task.css'
import PropTypes from 'prop-types'
import { IoCheckmarkCircle, IoCheckmarkCircleOutline, IoChevronDown, IoCloseCircleOutline, IoOptions } from 'react-icons/io5'
import { HiPencilAlt } from 'react-icons/hi'

function Task(props) {
    const [done, setDone] = React.useState(props.done)

    function handleClickDoneButton(){
        setDone(!done)
    }


    return (
        <div className="task">
            <div className="task__header">
                <p>{props.title}</p>
                <div onClick={handleClickDoneButton} className='task__done-button'>
                    {
                        (done) ? 
                        <IoCheckmarkCircle size={'30px'} /> : 
                        <IoCheckmarkCircleOutline size={'30px'} />
                    }
                </div>
            </div>

            <div className="task__body">
                {props.body}
            </div>

            <div className="task__footer">
                <div>
                    <IoOptions size={'22px'} />
                    Edit
                </div>
                <div>
                    <IoCloseCircleOutline size={'24px'} />
                    Delete
                </div>
            </div>

            <div className="task__content-cover">
                Expandir
                <IoChevronDown size={'30px'} />
            </div>
        </div>
    );
}

Task.proptypes = {
    done: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string
}

export default Task
