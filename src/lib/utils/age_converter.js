// Convertendo Idade a Partir de Um Timestamp

module.exports = {
    ageConverter(timestamp) {
        const calculate = Date.now() - timestamp
        const newDate = new Date(calculate)
    
        const age = newDate.getUTCFullYear() - 1970

        return Math.abs(age)
    }
}