import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Monday from './routes/Monday'
import { IoAddCircle } from 'react-icons/io5'


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
        <div className="add-task-button">
          <IoAddCircle size={'28px'} />
          <p>Add Task</p>
        </div>

        <Monday />
      </main>
    </div>
  )
}

export default App
