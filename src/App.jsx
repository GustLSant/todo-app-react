import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'


function App() {

  const [theme, setTheme] = React.useState('dark')

  function changeTheme(){
    (theme === 'dark') ? setTheme('light') : setTheme('dark')
    console.log("theme changed!")
  }

  return (
    <div className='app'>
      <Navbar theme={theme} changeTheme={changeTheme} />
      pagina Home
    </div>
  )
}

export default App
