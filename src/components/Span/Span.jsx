import React, { Children } from 'react';
import PropTypes from 'prop-types';

const Span = (props) => {
    return (
        <span className={props.cn}>
            {Children.toArray(props.children)}
        </span>
    );
};

Span.propTypes = {
    cn: PropTypes.string,
    children: PropTypes.node
};

export default Span;