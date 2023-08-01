import React from "react"
import PropTypes from 'prop-types'

export const TasksContext = React.createContext()

let id = 0

export const TasksProvider = ({children}) => {
    const [tasks, setTasks] = React.useState({
        day: 'Monday',
        data: [
            {
                id: getUniqueID(),
                done: false,
                title: 'Title',
                stepTasks: [
                    {
                        id: getUniqueID(),
                        done: false,
                        body: 'step task 1'
                    },
                    {
                        id: getUniqueID(),
                        done: false,
                        body: 'step task 2'
                    },
                    {
                        id: getUniqueID(),
                        done: false,
                        body: 'step task 3'
                    }
                ]
            },
            {
                id: getUniqueID(),
                done: false,
                title: 'Title',
                stepTasks: [
                    {
                        id: getUniqueID(),
                        done: false,
                        body: 'step task 1'
                    },
                    {
                        id: getUniqueID(),
                        done: false,
                        body: 'step task 2'
                    },
                    {
                        id: getUniqueID(),
                        done: false,
                        body: 'step task 3'
                    }
                ]
            },
            {
                id: getUniqueID(),
                done: false,
                title: 'Title',
                stepTasks: [
                    {
                        id: getUniqueID(),
                        done: false,
                        body: 'step task 1'
                    },
                    {
                        id: getUniqueID(),
                        done: false,
                        body: 'step task 2'
                    },
                    {
                        id: getUniqueID(),
                        done: false,
                        body: 'step task 3'
                    }
                ]
            },
        ] 
    })
    

    function setTasksData(_newData){
        const newTasks = {
            day: tasks.day,
            data: _newData
        }

        setTasks(newTasks)
    }


    function getUniqueID(){
        id++
        return id
    }


    //localStorage vai ser um dicionario com varias keys dos dias da semana, ex:
    /*
        {
            monday: {
                day: 'monday',
                data: [...]
            },
            tuesday: {
                day: 'tuesday',
                data: [...]
            },
            ...
        }

    */

    function saveToLocalStorage(){
        //pega o valor do dia
        //dependendo do valor do dia, altera uma ou outra key do localStorage
    }


    function getFromLocalStorage(_day){
        //dependendo do parametro pega uma ou outra key
    }


    return(
        <TasksContext.Provider value={{tasks, setTasks, getUniqueID, setTasksData}}>
            {children}
        </TasksContext.Provider>
    )
}

TasksProvider.propTypes = {
    children: PropTypes.array,
}