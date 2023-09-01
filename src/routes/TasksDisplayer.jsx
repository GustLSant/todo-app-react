import React from "react"
import './TasksDisplayer.css'
import { TasksContext } from '../contexts/TasksContext'
import TasksContainer from '../components/TasksContainer/TasksContainer'
import Button01 from '../components/Button01/Button01'
import PopUp from "../components/PopUp/PopUp"
import { IoAddCircleOutline, IoSaveOutline, IoMenu } from 'react-icons/io5'


function TasksDisplayer() {
    const {tasks, setTasksData, getUniqueID} = React.useContext(TasksContext)
    const [renderPopUpSuccess, setRenderPopUpSuccess] = React.useState(false)
    const [renderPopUpFail, setRenderPopUpFail] = React.useState(false)
    const [popUpArchiveTFailText, setPopUpArchiveTFailText] = React.useState('Archive Tasks Fail')


    function handleClickAddTask(){
        if(tasks.day !== ''){
            let newTasksData = [...tasks.data] //precisa fazer um deep copy?
            newTasksData.push(
                {
                id: getUniqueID(),
                done: false,
                title: '',
                stepTasks: []
                }
            )
            setTasksData(newTasksData)
        }
        else{
            return
        }
    }

    
    function handleClickArchiveTasks(){
        if(tasks.day !== ''){ // controle de erro para caso o usuario tenha recarregado a pagina e nenhuma dia esteja mais selecionado
            let date = new Date()
            date = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
            
            let archivedTasksSTR = localStorage.getItem('archivedTasks')
            let archivedTasksOBJ = {}
            let isAnyTaskDone = false

            if(archivedTasksSTR){ //se tiver algo no localStorage, reinicializa com o parse da string
                archivedTasksOBJ = JSON.parse(archivedTasksSTR)

                if(archivedTasksOBJ[date]){ // se tiver algo armazenado nesse dia
                    tasks.data.forEach((task)=>{ // armazena somente se n for repetido
                        let isUnique = true

                        archivedTasksOBJ[date].forEach((_task)=>{
                            if(task.id === _task.id){
                                isUnique = false
                                return
                            }
                        })
                        if(isUnique){
                            if(task.done){ // so adiciona tasks concluidas
                                archivedTasksOBJ[date].push(task)
                                isAnyTaskDone = true
                            }
                        }
                    })
                }
                else{ // se n tiver nada armzenado nesse dia (o dia n existe no localStorage)
                    archivedTasksOBJ[date] = [] //inicializa o dia

                    tasks.data.forEach((_task)=>{
                        if(_task.done){
                            archivedTasksOBJ[date].push(_task)
                            isAnyTaskDone = true
                        }
                    })
                }
            }
            else{ //se n tiver nada no localStorage, reinicializa a variavel com um novo objeto e as tasks do dia (que estejam concluidas)
                archivedTasksOBJ = {
                    [date]:[]
                }

                tasks.data.forEach((_task)=>{
                    if(_task.done){
                        archivedTasksOBJ[date].push(_task)
                        isAnyTaskDone = true
                    }
                })
            }
            
            // confirmacao de que realmente arquivou as tarefas

            let success = true
            try{localStorage.setItem('archivedTasks', JSON.stringify(archivedTasksOBJ))}
            catch(e){
                success = false
                console.log(e)
            }

            if(success && JSON.parse(localStorage.getItem('archivedTasks'))[date]){
                if(isAnyTaskDone){
                    setRenderPopUpSuccess(true)
                }
                else{
                    setPopUpArchiveTFailText('Tasks must be done to be archived')
                    setRenderPopUpFail(true)
                }
                
                let newTasksData = []
                tasks.data.forEach((task)=>{
                    if(!task.done){
                        newTasksData.push(task) // so adiciona as que nao estao concluidas (que nao foram arquivadas)
                    }
                })
                
                Array.from(document.getElementsByClassName('super-task done')).forEach((element)=>{
                    element.classList.add('been-deleted')
                })

                setTimeout(()=>{setTasksData(newTasksData)}, 400) //125ms eh o tempo de animacao padrao definido como variavel no index.css
            }
            else{
                setPopUpArchiveTFailText('Archive Tasks Fail')
                setRenderPopUpFail(true)
            }
        }
        else{
            return
        }
    }

    
    return (
        <div className="tasks-displayer">
            {renderPopUpSuccess && <PopUp text={'Tasks archived successfully!'} success={true} position={'right bottom'} setRender={setRenderPopUpSuccess} />}
            {renderPopUpFail && <PopUp text={popUpArchiveTFailText} success={false} setRender={setRenderPopUpFail} />}
            <div className="tasks-displayer__buttons-container">
                <Button01 label={'Add Task'}      fadeStyle={'fade-in-top'} onClick={handleClickAddTask} icon={<IoAddCircleOutline size={'28px'} />} size={'1.0em'} />
                <Button01 label={'Archive Tasks'} fadeStyle={'fade-in-top'} onClick={handleClickArchiveTasks} icon={<IoSaveOutline size={'24px'} />} size={'1.0em'} />
            </div>
            {
                (tasks.day !== '') ?
                <TasksContainer /> :
                <div className="tasks-displayer__instructions-container">
                    <p>No day selected, click on the</p> 
                    <IoMenu />
                    <p>Icon in the top left corner to select a day and be able to manage your tasks</p>
                </div>
            }
        </div>
    );
}

export default TasksDisplayer;