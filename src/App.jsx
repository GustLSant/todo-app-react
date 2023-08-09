import React from 'react'
import './App.css'
import { Outlet } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'

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
        <Outlet />
    </div>
  )
}

export default App