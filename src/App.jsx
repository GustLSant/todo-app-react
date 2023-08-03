import React from 'react'
import './App.css'
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
  const [theme, setTheme] = React.useState('dark')

  function changeTheme(){
    (theme === 'dark') ? setTheme('light') : setTheme('dark')
  }


  return (
    <div className={(theme === 'dark') ? 'app dark' : 'app light'}>
        <Navbar theme={theme} changeTheme={changeTheme} />
        
        <main>
          <TasksDisplayer />
        </main>
    </div>
  )
}

export default App