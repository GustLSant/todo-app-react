import React from "react"
import PropTypes from 'prop-types'

export const TasksContext = React.createContext()

let id = 0

export const TasksProvider = ({children}) => {
    const [tasks, setTasks] = React.useState({
        day: '',
        nextId: id,
        data: []
    })


    function setTasksData(_newData){
        const newTasks = {
            day: tasks.day,
            nextId: id,
            data: _newData
        }
        
        setTasks(newTasks)
        saveToLocalStorage(newTasks)
    }


    function getUniqueID(){
        id++
        return id
    }


    function saveToLocalStorage(_newTasks){
        localStorage.setItem(tasks.day.toLowerCase(), JSON.stringify(_newTasks))
    }


    function getFromLocalStorage(_day){
        const value = JSON.parse(localStorage.getItem(_day))

        if(value !== null){
            setTasks(value)
            id = value.nextId
        }
        else{ //se nao achou nada salvo no storage
            // id = 0 (se reiniciar o valor do ID, eh capaz de repedir a key e nao atualizar componentes da maneira correta)
            setTasks({
                day: _day.charAt(0).toUpperCase()+_day.slice(1),
                nextId: id,
                data: []
            })
        }
        
    }


    return(
        <TasksContext.Provider value={{tasks, setTasks, getUniqueID, setTasksData, getFromLocalStorage}}>
            {children}
        </TasksContext.Provider>
    )
}

TasksProvider.propTypes = {
    children: PropTypes.object,
}