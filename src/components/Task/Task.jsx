import React from 'react'
import './Task.css'
import PropTypes from 'prop-types'
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from 'react-icons/io5'

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
