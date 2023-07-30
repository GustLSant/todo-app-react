import React from 'react'
import './Task.css'
import PropTypes from 'prop-types'
import { IoCheckmarkCircle, IoCheckmarkCircleOutline, IoChevronDown, IoCloseCircleOutline, IoOptions } from 'react-icons/io5'


function Task(props) {
    const id = props.id
    const [done, setDone] = React.useState(props.done)
    const [isEditing, setIsEditing] = React.useState(false)
    const [title, setTitle] = React.useState(props.title)
    const [body, setBody] = React.useState(props.body)
    
    //para usar qnd as alteracoes forem canceladas
    const defaultTitle = props.title 
    const defaultBody = props.body

    function handleClickDoneButton(){
        setDone(!done)
    }

    function handleClickEditButton(){
        setIsEditing(!isEditing)
    }


    return (
        <div className="task">
            <div className="task__header">
                <textarea value={title} onChange={(e) => {setTitle(e.target.value)}} disabled={!isEditing} rows={1} />

                <div onClick={handleClickDoneButton} className='task__done-button'>
                    {
                        (done) ? 
                        <IoCheckmarkCircle size={'30px'} /> : 
                        <IoCheckmarkCircleOutline size={'30px'} />
                    }
                </div>
            </div>

            <div className="task__body">
                <textarea value={body} onChange={(e) => {setBody(e.target.value)}} disabled={!isEditing} rows={3} />
            </div>

            <div className="task__footer">
                {
                    (!isEditing) 
                    ? 
                    <button onClick={handleClickEditButton}>
                        <IoOptions size={'22px'} /> {/* quando estiver editando tem q ficar dois botoes: 'save edits' e 'discard edits' */}
                        Edit
                    </button> 
                    :
                    <div>
                        <button>Save Edits</button>
                        <button>Cancel Edits</button>
                    </div>
                }
                
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
    id: PropTypes.number,
    done: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string
}

export default Task
