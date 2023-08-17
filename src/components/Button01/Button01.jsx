import './Button01.css'
import PropTypes from 'prop-types'


function Button01(props) {
    let fadeStyle = (props.fadeStyle) ? props.fadeStyle : ''
    
    return (
        <div className={`button-01 hover-effect-01 ${(props.stretch === true)?'stretch':''} ${(props.isDangerous === true)?'danger-button':''} ${fadeStyle}`} style={{fontSize: props.size}} onClick={props.onClick}>
            {props.icon}
            <p>{props.label}</p>
        </div>
    );
}

Button01.propTypes = {
    stretch: PropTypes.bool,
    size: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.string,
    onClick: PropTypes.func,
    isDangerous: PropTypes.bool,
    fadeStyle: PropTypes.string,
}

export default Button01;