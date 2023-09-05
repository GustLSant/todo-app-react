import './ArchivedTask.css'
import PropTypes from 'prop-types';
import { IoCheckmarkCircle } from 'react-icons/io5'


function ArchivedTask(props) {
    
    return (
        <div className="archived-task">
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
                    props.stepTasks.map((st, id)=>{
                        return(
                            <p key={id}>
                                {st.body}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    );
}

ArchivedTask.propTypes = {
    title: PropTypes.string,
    stepTasks: PropTypes.array,
}

export default ArchivedTask