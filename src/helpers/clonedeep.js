const clonedeep = (src) => {
    let dest = src instanceof Array ? [] : {};

    Object.keys(src).forEach(key => {
        if ((src instanceof Array) && typeof src[key] === 'object' && src[key] !== null) {
            dest[key] = clonedeep(src[key]);
        } else {
            dest[key] = src[key];
        }
    });

    return dest;
};

export default clonedeep;