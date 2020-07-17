// Declarando Variáveis Globais (require)

const fs = require('fs')
const data = require('../../data.json')


// Exportando Módulo Com o Controller

module.exports = {
    async index (req, res) {
        return res.render("members/new_member")
    },

    async create(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""
            || req.body.gender == undefined
            || req.body.blood_type == undefined) {

                return res.send("Preencha todos os campos corretamente")

            }
        }

        if(!data.members) {
            return res.send("A lista de membros ainda não foi criada")
        } // Verificar esta condicional após criação do banco de dados

        let {avatar_url, name, email, birth, gender, blood_type, weight, height} = req.body
        const id = Number(data.members.length + 1)
        const created_at = Date.now()

        birth = Date.parse(birth)
        weight = Number(weight)
        height = Number(height)

        data.members.push({
            id,
            avatar_url,
            name,
            email,
            birth,
            gender,
            blood_type,
            weight,
            height,
            created_at
        })

        fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
            if(err){
                return res.send("Erro na escrita do arquivo")
            }

            return res.redirect("/members")
        })
    }
}