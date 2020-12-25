function getValues(options, isDataFrame=false) {
    if(options === [] || options === null) {
        return options
    }
    let values = []
    
    values = options.map(option => {
        return option.value
    })
    
    return values
}

export { getValues }