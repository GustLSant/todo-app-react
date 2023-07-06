import './Navbar.css'
import React from 'react'
import { IoListCircle, IoMenu, IoBulb, IoBulbOutline } from "react-icons/io5"
import PropTypes from 'prop-types';


function Navbar(props) {

    const [active, setActive] = React.useState(true)
    const [dayState, setDayState] = React.useState('')
    const daysWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    function handleClickDayWeek(_day){
        setDayState(_day)
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
        <div className={(active) ? "navbar active" : "navbar"}>
            <div className="navbar__header">
                <div className='navbar-header__logo'>
                    <IoListCircle size={'36px'} style={{transform: 'rotate(-0deg)'}} />
                    ToDo App
                </div>
                <IoMenu size={'36px'} className='navbar__button-toggle' onClick={handleClickToggleNavBar} />
            </div>

            <div className="navbar__main">
                {
                    daysWeek.map((day, key) => {
                        const isActive = dayState === day
                        const classes = (isActive) ? "navbar__day-container active" : "navbar__day-container"
                        
                        return(
                            <div key={key} onClick={() => {handleClickDayWeek(day)}} className={classes}>
                                <div className='day-week__bar'></div>
                                {day}
                            </div>
                        )
                    })
                }
            </div>

            <div style={{flexGrow: '1'}}></div>

            
            <div className="navbar__footer" onClick={handleClickTheme} >
                {
                    (props.theme === 'dark') ? 
                    <IoBulb size={'20px'} /> : 
                    <IoBulbOutline size={'20px'} />
                }
                Change Theme
            </div>
        </div>
    );
}

Navbar.propTypes = {
    theme: PropTypes.string,
    changeTheme: PropTypes.func
}

export default Navbar;