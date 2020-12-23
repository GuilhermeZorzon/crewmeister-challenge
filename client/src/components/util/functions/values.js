function getValues(options, isDataFrame=false) {
    if(options === [] || options === null) {
        return options
    }
    let values = []
    if(isDataFrame === false) {
        values = options.map(option => {
            return option.value
        })
    } else {
        values = options.toArray().map(option => {
            return option[0]
        })
    }
    return values
}

export { getValues }