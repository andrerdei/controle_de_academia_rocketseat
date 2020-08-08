// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo Com o Model

module.exports = {
    showEditingMember(data, callback) {
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
    },

    updateEditingMember(data, callback) {
        const query = `
            UPDATE members SET
                avatar_url = ($2),
                name = ($3),
                email = ($4),
                birth = ($5),
                gender = ($6),
                blood_type = ($7),
                weight = ($8),
                height = ($9)
            WHERE id = $1
        `

        const values = [
            data.id,
            data.avatar_url,
            data.name,
            data.email,
            data.birth,
            data.gender,
            data.blood_type,
            data.weight,
            data.height,
        ]

        db.query(query, values, (err, results) => {
            if(err) {
                throw `Erro no banco de dados ${err}`
            }

            callback(data)
        })
    },

    deleteEditingMember(data, callback) {
        const query = `
            DELETE FROM members
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