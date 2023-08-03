import React from 'react'
import './App.css'
import { TasksContext } from './contexts/TasksContext';
import Button01 from './components/Button01/Button01'
import Navbar from './components/Navbar/Navbar'
import TasksContainer from './routes/TasksContainer'
import { IoAddCircle, IoSaveOutline, IoDocumentsOutline } from 'react-icons/io5'

/*
  A fazer:
    - pagina de arquivados
    - tela inicial?
    - tema Light
*/


function App() {
  const {tasks, setTasksData, getUniqueID} = React.useContext(TasksContext)
  const [theme, setTheme] = React.useState('dark')

  function changeTheme(){
    (theme === 'dark') ? setTheme('light') : setTheme('dark')
  }

  function handleClickAddTask(){
    let newTasksData = [...tasks.data]
    const nextId = getUniqueID()
    newTasksData.push(
      {
        id: nextId,
        done: false,
        title: 'New Task',
        stepTasks: []
      }
    )
    setTasksData(newTasksData)
  }

  function handleClickArchiveTasks(){
    
  }


  return (
    <div className={(theme === 'dark') ? 'app dark' : 'app light'}>
        <Navbar theme={theme} changeTheme={changeTheme} />
        
        <main>
          <div className="main__buttons-container">
            <Button01 label={'Add Task'} onClick={handleClickAddTask} icon={<IoAddCircle size={'28px'} />} size={'1.0em'} />
            <Button01 label={'Archive Tasks'} onClick={handleClickArchiveTasks} icon={<IoSaveOutline size={'24px'} />} size={'1.0em'} />
            <Button01 label={'Export Tasks'} onClick={()=>{}} icon={<IoDocumentsOutline size={'24px'} />} size={'1.0em'} />
          </div>
          <TasksContainer />
        </main>
    </div>
  )
}

export default App