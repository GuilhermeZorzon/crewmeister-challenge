function getValues(options) {
    if(options === [] || options === null) {
        return options
    }
    let values = options.map(option => {
        return option.value
    })
    return values
}

export { getValues }