import React from "react"
import './PopUp.css'
import PropTypes from 'prop-types'
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5'

// Ao ser renderizado vai tocar a animacao de fade lento
// Se houver um toque ou clique nesse component, ele vai fazer um fade bem rapido e ficar com display none
// Se ele for re-renderizado, vai voltar ao primeiro comentario (ainda falta descobrir uma maneira facil de re-renderizar esse negocio)


function PopUp(props){
    const popUpRef = React.useRef(null)

    React.useEffect(()=>{
        setTimeout(disable, 3000) // tem que ser o mesmo tempo da animacao AnimationLifeTime
    }, [])

    function handleInteract(){
        disable()
    }

    function enable(){
        popUpRef.current.className = 'pop-up'
    }

    function disable(){
        popUpRef.current.className = 'pop-up deleting'
    }


    return (
        <div className="pop-up" ref={popUpRef} onClick={handleInteract} onTouchStart={handleInteract}>
            <div className="pop-up__content">
                {
                    (props.success) ?
                    <IoCheckmarkSharp /> :
                    <IoCloseSharp />
                }
                <p>
                    {props.text}
                </p>
            </div>
        </div>
    );
}

PopUp.propTypes = {
    text: PropTypes.string,
    success: PropTypes.bool
}

export default PopUp;