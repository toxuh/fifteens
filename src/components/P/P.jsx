import React, { Children } from 'react';
import PropTypes from 'prop-types';

const P = (props) => {
    return (
        <p className={props.cn}>
            {Children.toArray(props.children)}
        </p>
    );
};

P.propTypes = {
    cn: PropTypes.string,
    children: PropTypes.node
};

export default P;