// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo Com o Model

module.exports = {
    createNewInstructor(data, callback) {
        const query = `
            INSERT INTO instructors(
                avatar_url,
                name,
                birth,
                gender,
                services,
                created_at
            )

            VALUES ($1, $2, $3, $4, $5, $6)
        `

        const values = [
            data.avatar_url,
            data.name,
            data.birth,
            data.gender,
            data.services,
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