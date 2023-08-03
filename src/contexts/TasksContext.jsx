import React from "react"
import PropTypes from 'prop-types'

export const TasksContext = React.createContext()

let id = 0

export const TasksProvider = ({children}) => {
    const [tasks, setTasks] = React.useState({
        day: 'Monday',
        data: [] 
    })

    function setTasksData(_newData){
        const newTasks = {
            day: tasks.day,
            data: _newData
        }

        setTasks(newTasks)
        saveToLocalStorage()
    }


    function getUniqueID(){
        id++
        return id
    }


    function saveToLocalStorage(){
        localStorage.setItem(tasks.day.toLowerCase(), JSON.stringify(tasks))
    }


    function getFromLocalStorage(_day){
        const value = JSON.parse(localStorage.getItem(_day))

        if(value !== null){
            setTasks(JSON.parse(localStorage.getItem(_day)))
        }
        else{
            setTasks({
                day: _day.charAt(0).toUpperCase()+_day.slice(1),
                data: []
            })
        }
        
    }


    return(
        <TasksContext.Provider value={{tasks, setTasks, getUniqueID, setTasksData, getFromLocalStorage, saveToLocalStorage}}>
            {children}
        </TasksContext.Provider>
    )
}

TasksProvider.propTypes = {
    children: PropTypes.object,
}