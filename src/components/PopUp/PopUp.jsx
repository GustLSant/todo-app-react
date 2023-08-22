import React from "react"
import './PopUp.css'
import PropTypes from 'prop-types'
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5'

// Para renderizar esse popup, precisa de um state no componente pai, atrelado a um conditional rendering (&&) desse popup, e o setter desse state vai no prop setRender do popUp
// Ao ser renderizado vai tocar a animacao de fade lento
// Se houver um toque ou clique nesse component, ele vai fazer um fade bem rapido e ficar com display none
// Se ele for re-renderizado, vai voltar ao primeiro comentario


function PopUp(props){
    const popUpRef = React.useRef(null)
    let contentStylesPosition = {}

    if(props.position == 'right bottom'){
        contentStylesPosition = {
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        }
    }

    React.useEffect(()=>{
        setTimeout(disable, 2500) // tem que ser o mesmo tempo (ou um pouquinho menos, pra agilizar) da animacao AnimationLifeTime
    })

    function handleInteract(){
        disable()
    }

    // function enable(){
    //     popUpRef.current.className = 'pop-up'
    // }

    function disable(){
        if(popUpRef.current){
            popUpRef.current.className = 'pop-up deleting'
            props.setRender(false)
        }
    }


    return (
        <div className="pop-up" ref={popUpRef} style={contentStylesPosition} >
            <div className="pop-up__content" onClick={handleInteract} onTouchStart={handleInteract}>
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
    success: PropTypes.bool,
    setRender: PropTypes.func,
    position: PropTypes.string,
}

export default PopUp;