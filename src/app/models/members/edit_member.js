// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo Com o Model

module.exports = {
    showEditingMember(data, callback) {
        const query = `
            SELECT members.*, instructors.id As instructor_id, instructors.name As instructor_name
            FROM members
            RIGHT JOIN instructors ON (instructors.id = members.responsible_instructor_id)
            ORDER BY instructors.name ASC
        `

        db.query(query, (err, results) => {
            if(err) {
                throw `Erro no banco de dados ${err}`
            }

            callback(results.rows)
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
                weight = ($7),
                height = ($8),
                blood_type = ($9),
                responsible_instructor_id = ($10)
            WHERE id = $1
        `

        const values = [
            data.id,
            data.avatar_url,
            data.name,
            data.email,
            data.birth,
            data.gender,
            data.weight,
            data.height,
            data.blood_type,
            data.responsible_instructor_id,
        ]

        db.query(query, values, (err, results) => {
            if(err) {
                throw `Erro no banco de dados ${err}`
            }

            callback()
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