// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo Com o Model

module.exports = {
    createNewMember(data, callback) {
        const query = `
            INSERT INTO members(
                avatar_url,
                name,
                email,
                birth,
                gender,
                blood_type,
                weight,
                height,
                created_at
            )

            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.birth,
            data.gender,
            data.blood_type,
            data.weight,
            data.height,
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