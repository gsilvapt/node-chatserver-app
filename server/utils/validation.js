let isRealString = (aString) => {
    return typeof(aString) === 'string' && aString.trim().length > 0;
}

module.exports = {
    isRealString
}