import React from 'react';
import { TasksContext } from '../../contexts/TasksContext';
import PropTypes from 'prop-types'
import Button01 from '../Button01/Button01';
import StepTask from '../StepTask/StepTask'
import { IoCheckmarkCircle, IoCheckmarkCircleOutline, IoChevronDown, IoCloseCircleOutline, IoOptions } from 'react-icons/io5'

//Documentacao:
// nao usa states pois eh renderizado e re-renderizado por seu componente pai
// qualquer alteracao aqui eh passada para o objeto que gerou esse componente e entao ele eh renderizado novamente


function SuperTask(props) {
    const {tasks, setTasks} = React.useContext(TasksContext)
    const id = props.id
    let done = props.done
    let title = props.title
    let stepTasks = props.stepTasks
    const [isEditing, setIsEditing] = React.useState(false)

    function handleClickEditButton(){
        setIsEditing(!isEditing)
    }

    //funcao que vai passar as modificacoes para o objeto que guarda as informacoes das Tasks
    function saveData(){
        props.handleUpdateTask(
            {
                id: id,
                done: done,
                title: title,
                stepTasks: stepTasks,
            }
        )
        // ainda da pra fazer uma otimizacao pra mandar so o valor do objeto modificado
    }

    function handleTitleChange(e){
        title = e.target.value
        saveData()
    }

    // function handleAddStepTask(){
    //     stepTasks.push(
    //         {
    //             body: 'step task x'
    //         }
    //     )

    //     saveData()
    // }

    // function handleChangeStepTask(changedST){
    //     let newStepTasks = []
    //     stepTasks.forEach(item => {
    //         if(item.id === changedST.id){
    //             newStepTasks.push(changedST)
    //         }
    //         else{
    //             newStepTasks.push(item)
    //         }
    //     })
    //     stepTasks = newStepTasks
    //     saveData()
    // }


    return (
        <div className="super-task">
            <div className="super-task__header">
                <div className="super-task-header__title-container">
                    <textarea value={title} onChange={handleTitleChange} disabled={!isEditing} rows={1} />
                    {
                        (done) ?
                        <IoCheckmarkCircle        size={'30px'} /> :
                        <IoCheckmarkCircleOutline size={'30px'} />
                    }
                </div>
                <div className="super-task-header__buttons-container">
                    <Button01 label='Add step task' onClick={handleAddStepTask} icon={<IoCheckmarkCircle size={'25px'} />} size={'1.05em'} />
                    <Button01 label='Edit task' icon={<IoCheckmarkCircle size={'25px'} />} size={'1.05em'} onClick={handleClickEditButton} />
                </div>
            </div>

            <div className="super-task__body">
                <div className="super-task-body__step-tasks-container">
                    {
                        stepTasks.map((st, key) => {
                            return(
                                <StepTask key={key} id={st.id} done={st.done} body={st.body} isEditing={isEditing} handleChange={handleChangeStepTask} />
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