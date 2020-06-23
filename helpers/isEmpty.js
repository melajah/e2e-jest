module.exports = function (form) {
    const nulls = []
    for (const key in form) {
        if (form[key] == undefined || form[key] == "" || !form[key]) {
            const name = key.charAt(0).toUpperCase() + key.slice(1)
            nulls.push({
                message: `${name} is required`
            })
        }
    }
    
    return nulls.length ? nulls : false
}