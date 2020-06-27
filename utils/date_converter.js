// Declarando Variáveis Globais (require)

const {infoDashSplitter} = require('./info_splitter')


// Convertendo Data para formatação DD/MM/AA

module.exports = {
    dateConverter(timestamp) {
        const defaultDate = new Intl.DateTimeFormat("default", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })
        .format(timestamp)

        const dateArray = infoDashSplitter(defaultDate)

        const day = dateArray[2]
        const month = dateArray[1]
        const year = dateArray[0]

        const formattedDate = `${day}/${month}/${year}`

        return formattedDate
    }
}