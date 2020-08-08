// Declarando Variáveis Globais (require)

const db = require('../../../config/db')

const {dateConverter} = require('../../../lib/utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    index (req, res) {
        return res.render("members/new_member")
    },

    create(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""
            || req.body.gender == undefined
            || req.body.blood_type == undefined) {

                return res.send("Preencha todos os campos corretamente")

            }
        }

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

        const {avatar_url, name, email, birth, gender, blood_type} = req.body
        let {weight, height} = req.body
        let created_at = Date.now()

        weight = Number(weight)
        height = Number(height)
        created_at = dateConverter(created_at).dashFormattedDateReverse

        const values = [
            avatar_url,
            name,
            email,
            birth,
            gender,
            blood_type,
            weight,
            height,
            created_at
        ]

        db.query(query, values, (err, results) => {
            if(err) {
                res.send("Erro ao conectar com o banco de dados, tente novamente")
            }

            return res.redirect("/members")
        })
    }
}