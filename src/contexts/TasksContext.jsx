import React from "react"
import PropTypes from 'prop-types'

export const TasksContext = React.createContext()

let id = 0

export const TasksProvider = ({children}) => {
    const [tasks, setTasks] = React.useState(
        [
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
    )
    
    function getUniqueID(){
        id++
        return id
    }



    return(
        <TasksContext.Provider value={{tasks, setTasks, getUniqueID}}>
            {children}
        </TasksContext.Provider>
    )
}

TasksProvider.propTypes = {
    children: PropTypes.array,
}