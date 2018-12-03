import React, { Children } from 'react';
import PropTypes from 'prop-types';

const H1 = (props) => {
    return (
        <h1 className={props.cn} >
            {Children.toArray(props.children)}
        </h1>
    );
};

H1.propTypes = {
    cn: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default H1;