import React from 'react'
import './App.css'
import { TasksContext } from './contexts/TasksContext'
import Navbar from './components/Navbar/Navbar'
import TasksDisplayer from './routes/TasksDisplayer'

/*
  A fazer:
    - pagina de arquivados
    - tela inicial?
    - tema Light?
    - suavizacao dos efeitos (fade, etc)
*/


function App() {
  const {getFromLocalStorage} = React.useContext(TasksContext)
  const [theme, setTheme] = React.useState('dark')

  function changeTheme(){
    (theme === 'dark') ? setTheme('light') : setTheme('dark')
  }

  function handleClickDayWeek(_day){
    getFromLocalStorage(_day.toLowerCase())
  }

  function handleClickArchivedTasks(){
    
  }


  return (
    <div className={(theme === 'dark') ? 'app dark' : 'app light'}>
        <Navbar theme={theme} changeTheme={changeTheme} handleClickDayWeek={handleClickDayWeek} handleClickArchivedTasks={handleClickArchivedTasks} />
        
        <main>
          <TasksDisplayer />
        </main>
    </div>
  )
}

export default App