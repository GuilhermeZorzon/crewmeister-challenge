function dateToString(date, UTC=true) {
    let dayFirstChar = ''
    let monthFirstChar = ''

    if(UTC === false) {
        date.setDate(date.getDate() + 1)
    }
    if(date.getDate() < 10) {
        dayFirstChar = '0'
    }
    if(date.getMonth() < 10) {
        monthFirstChar = '0'
    }
    return (date.getYear() + 1900).toString() + '-' + monthFirstChar + (date.getMonth() + 1).toString() + '-' + dayFirstChar + (date.getDate()).toString()
}

export { dateToString }