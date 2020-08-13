// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo Com o Model

module.exports = {
    selectResponsibleInstructorOptions(callback) {
        const query = `
            SELECT instructors.id As instructor_id, instructors.name As instructor_name
            FROM instructors
        `

        db.query(query, (err, results) => {
            if(err) {
                throw `Erro no banco de dados ${err}`
            }

            console.log(results.rows)

            callback(results.rows)
        })
    },

    createNewMember(data, callback) {
        const query = `
            INSERT INTO members(
                avatar_url,
                name,
                email,
                birth,
                gender,
                weight,
                height,
                blood_type,
                responsible_instructor_id,
                created_at
            )

            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.birth,
            data.gender,
            data.weight,
            data.height,
            data.blood_type,
            data.responsible_instructor_id,
            data.created_at
        ]

        db.query(query, values, (err, results) => {
            if(err) {
                throw `Erro no banco de dados ${err}`
            }

            callback()
        })
    }
}