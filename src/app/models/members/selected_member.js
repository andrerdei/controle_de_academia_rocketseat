// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo Com o Model

module.exports = {
    showSelectedMember(data, callback) {
        const query = `
            SELECT members.*, instructors.name AS instructor_name
            FROM members
            LEFT JOIN instructors ON (instructors.id = members.responsible_instructor_id)
            WHERE members.id = $1
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