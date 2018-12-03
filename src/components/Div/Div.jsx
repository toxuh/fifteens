import React, { Children } from 'react';
import PropTypes from 'prop-types';

const Div = (props) => {
    return (
        <div className={props.cn} onClick={props.onClick}>
            {Children.toArray(props.children)}
        </div>
    );
};

Div.propTypes = {
    cn: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node
};

export default Div;