import React from "react";
import PropTypes from 'prop-types'
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from 'react-icons/io5'



function StepTask(props) {
    let body = props.body

    function handleBodyChange(e){
        body = e.target.value
        console.log(props.id)
        props.handleChange(
            {
                id: props.id,
                done: props.done,
                body: body,
            }
        )
    }

    return (
        <div className="step-task">
            <textarea value={body} onChange={(e) => {handleBodyChange(e)}} disabled={!props.isEditing} rows={1} />
            {
                (props.done) ?
                <IoCheckmarkCircle        size={'30px'} /> :
                <IoCheckmarkCircleOutline size={'30px'} />
            }
        </div>
    );
}

StepTask.propTypes = {
    id: PropTypes.number,
    done: PropTypes.bool,
    body: PropTypes.string,
    isEditing: PropTypes.bool,
    handleChange: PropTypes.func,
}

export default StepTask;