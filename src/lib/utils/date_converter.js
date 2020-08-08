// Declarando Variáveis Globais (require)

const {infoQuotationMarksSplitter, infoTimeSplitter, infoDashSplitter} = require('./info_splitter')


// Convertendo Data para formatação DD/MM/AA

module.exports = {
    dateConverter(data) {
        const defaultDate = new Intl.DateTimeFormat("default", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })
        .format(data)

        const dateArray = infoDashSplitter(defaultDate)

        const day = dateArray[2]
        const month = dateArray[1]
        const year = dateArray[0]

        const slashFormattedDate = `${day}/${month}/${year}`
        const dashFormattedDateReverse = `${year}-${month}-${day}`

        return {
            day,
            month,
            year,

            slashFormattedDate,
            dashFormattedDateReverse
        }
    },

    dateConverterBuggedTimestamp(data) {
        // Não foi possível utilizar "Intl.DateTimeFormat" aqui, pois há algum problema ao transformar a data do formulário em timestamp (computa 1 dia a menos)

        const defaultDate = new Date(data)


        // Foi necessário converter duas vezes a "defaultDate" para criar uma string no formato desejado

        let defaultDateString = JSON.stringify(defaultDate)
        defaultDateString = defaultDateString.toString()
        

        // Foi necessário fazer 3 splits para limpar o array, para chegar ao formato desejado

        let dateArray = infoQuotationMarksSplitter(defaultDateString)
        dateArray = infoTimeSplitter(dateArray[1])
        dateArray = infoDashSplitter(dateArray[0])
        
        
        const day = dateArray[2]
        const month = dateArray[1]
        const year = dateArray[0]

        const slashFormattedDate = `${day}/${month}/${year}`
        const dashFormattedDateReverse = `${year}-${month}-${day}`

        return {
            day,
            month,
            year,

            slashFormattedDate,
            dashFormattedDateReverse
        }
    }
}