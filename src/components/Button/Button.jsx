import React, { Children } from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <button
            className={props.cn}
            onClick={props.onClick}
        >
            {Children.toArray(props.children)}
        </button>
    );
};

Button.propTypes = {
    cn: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired
};

export default Button;