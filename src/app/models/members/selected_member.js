// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo Com o Model

module.exports = {
    showSelectedMember(data, callback) {
        const query = `
            SELECT * FROM members
            WHERE id = $1
        `

        const values = [
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) {
                throw `Erro no banco de dados ${err}`
            }

            callback(results.rows[0])
        })
    }
}