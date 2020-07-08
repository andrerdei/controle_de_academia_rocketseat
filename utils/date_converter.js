// Declarando Variáveis Globais (require)

const {infoQuotationMarksSplitter, infoTimeSplitter, infoDashSplitter} = require('./info_splitter')


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
    },

    dateConverterReverse(timestamp) {
        // Não foi possível utilizar "Intl.DateTimeFormat" aqui, pois há algum problema ao transformar a data do formulário em timestamp (computa 1 dia a menos)

        const defaultDate = new Date(timestamp)


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

        const formattedDate = `${year}-${month}-${day}`

        return formattedDate
    }
}