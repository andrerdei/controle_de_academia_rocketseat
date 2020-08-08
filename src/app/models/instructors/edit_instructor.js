// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo Com o Model

module.exports = {
    showEditingInstructor(data, callback) {
        const query = `
            SELECT * FROM instructors
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
    },

    updateEditingInstructor(data, callback) {
        const query = `
            UPDATE instructors SET
                avatar_url = ($2),
                name = ($3),
                birth = ($4),
                gender = ($5),
                services = ($6)
            WHERE id = $1
        `

        const values = [
            data.id,
            data.avatar_url,
            data.name,
            data.birth,
            data.gender,
            data.services
        ]

        db.query(query, values, (err, results) => {
            if(err) {
                throw `Erro no banco de dados ${err}`
            }

            callback(data)
        })
    },

    deleteEditingInstructor(data, callback) {
        const query = `
            DELETE FROM instructors
            WHERE id = $1
        `

        const values = [
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) {
                throw `Erro no banco de dados ${err}`
            }

            callback()
        })
    }
}