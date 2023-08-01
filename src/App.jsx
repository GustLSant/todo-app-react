import React from 'react'
import './App.css'
import { TasksProvider } from './contexts/TasksContext'
import ButtonAddTask from './components/ButtonAddTask/ButtonAddTask'
import Navbar from './components/Navbar/Navbar'
import TasksContainer from './routes/TasksContainer'


function App() {
  const [theme, setTheme] = React.useState('dark')

  function changeTheme(){
    (theme === 'dark') ? setTheme('light') : setTheme('dark')
    console.log("theme changed!")
  }


  return (
    <div className={(theme === 'dark') ? 'app dark' : 'app light'}>
      <Navbar theme={theme} changeTheme={changeTheme} />
      
      <main>
        <TasksProvider>
          <ButtonAddTask />
          <TasksContainer day={'Monday'} />
        </TasksProvider>
      </main>
    </div>
  )
}

export default App