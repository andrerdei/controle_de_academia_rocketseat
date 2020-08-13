// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo Com o Model

module.exports = {
    showSelectedInstructor(data, callback) {
        const query = `
            SELECT instructors.*, COUNT(members) AS total_students
            FROM instructors
            LEFT JOIN members ON (members.responsible_instructor_id = instructors.id)
            GROUP BY instructors.id
        `

        db.query(query, (err, results) => {
            if(err) {
                throw `Erro no banco de dados ${err}`
            }

            callback(results.rows)
        })
    }
}