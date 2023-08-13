import './Button01.css'
import PropTypes from 'prop-types'


function Button01(props) {
    
    return (
        <div className={`button-01 hover-effect-01 ${(props.stretch === true)?'stretch':''}`} style={{fontSize: props.size}} onClick={props.onClick}>
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
}

export default Button01;