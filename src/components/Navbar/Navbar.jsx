import React from 'react'
import './Navbar.css'
import { TasksContext } from '../../contexts/TasksContext'
import { useNavigate } from "react-router-dom"
import { IoListCircle, IoMenu, IoChevronBackOutline, IoSaveOutline, IoBulb, IoBulbOutline, IoArchiveOutline, IoDocumentsOutline } from "react-icons/io5"
import PropTypes from 'prop-types';


function Navbar(props) {
    const [active, setActive] = React.useState(false)
    const { tasks, getFromLocalStorage } = React.useContext(TasksContext) // apenas para verificar qual o dia ativo
    const navigate = useNavigate()
    const daysWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    function handleClickLogo(){
        getFromLocalStorage('')
        return navigate('/')
    }

    function handleClickDayWeek(_day){
        getFromLocalStorage(_day.toLowerCase())
        return navigate("/tasks")
    }

    function handleClickArchivedTasks(){
        getFromLocalStorage('archived')
        return navigate("/archived-tasks")
    }

    function handleClickImportTasks(){
        return navigate('/import-tasks')
    }

    function handleClickExportTasks(){
        const fileContent = JSON.stringify(localStorage)
        
        const file = new Blob([fileContent], {type: 'text/plain'})
        const link = document.createElement('a')
        
        const date = new Date()
        link.href = window.URL.createObjectURL(file)
        link.download = `ExportedTasks_${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}.txt`; // nome do arquivo
    
        link.click()  // simula um clique no link para iniciar o download
        link.remove() // remove o elemento recem criado
    }

    function handleClickToggleNavBar(){
        setActive(!active)
    }

    function handleClickTheme(){
        if(active){
            props.changeTheme()
        }
    }


    return (
        <div className={`navbar ${(active)?'active':''}`}>
            <div className='navbar__content-container'>
                <div className="navbar__header">
                    <div className='navbar-header__logo' onClick={handleClickLogo}>
                        <IoListCircle size={'36px'} style={{transform: 'rotate(-0deg)'}} />
                        ToDo App
                    </div>
                </div>

                <div style={{flexGrow: '1'}}></div>

                <nav className="navbar__main">
                    {
                        daysWeek.map((day, key) => {
                            const isActive = tasks.day === day
                            const classes = (isActive) ? "navbar__day-container active" : "navbar__day-container"
                
                            return(
                                <div key={key} onClick={()=>{handleClickDayWeek(day)}} className={classes}>
                                    <div className='day-week__bar'></div>
                                    {day}
                                </div>
                            )
                        })
                    }
                </nav>
                
                <div style={{flexGrow: '2'}}></div>
                
                <div className="navbar__footer">
                    <div onClick={handleClickArchivedTasks} className='hover-effect-01'>
                        <IoSaveOutline size={'22px'} />
                        Archived Tasks
                    </div>
                    <div onClick={handleClickTheme} className='hover-effect-01'>
                        {
                            (props.theme === 'dark') ?
                            <IoBulb size={'20px'} /> :
                            <IoBulbOutline size={'20px'} />
                        }
                        Change Theme
                    </div>
                    <div onClick={handleClickImportTasks} className='hover-effect-01'>
                        <IoArchiveOutline size={'22px'} />
                        Import Tasks
                    </div>
                    <div onClick={handleClickExportTasks} className='hover-effect-01'>
                        <IoDocumentsOutline size={'22px'} />
                        Export Tasks
                    </div>
                </div>
            </div>

            <div className="navbar__toggle-button-container hover-effect-02" onClick={handleClickToggleNavBar}>
                {
                    (active) ?
                    <IoChevronBackOutline size={'36px'} className='navbar__button-toggle' /> :
                    <IoMenu size={'36px'} className='navbar__button-toggle' />
                }
            </div>
        </div>
    );
}

Navbar.propTypes = {
    theme: PropTypes.string,
    changeTheme: PropTypes.func,
}

export default Navbar;