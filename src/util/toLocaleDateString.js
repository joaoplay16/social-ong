function toLocaleDateString(date) {
    date = date.substring(0,10)
    
    let convetedDate = new Date(date)
    
    let day = convetedDate.getUTCDate().toString().replace(/^(\d)$/, "0$1")
    let month = (convetedDate.getUTCMonth() + 1).toString().replace(/^(\d)$/, "0$1")
    let year = convetedDate.getUTCFullYear().toString()

    return day + '/' + month + '/' + year
}

export default toLocaleDateString