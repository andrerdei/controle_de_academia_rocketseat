// Declarando Variáveis Globais (require)

const fs = require('fs')
const data = require('../../data.json')


// Exportando Módulo Com o Controller

module.exports = {
    async index (req, res) {
        return res.render("instructors/new_instructor")
    },

    async create(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == "" || req.body.gender == undefined) {
                return res.send("Preencha Todos os Campos!")
            }
        }

        if(!data.instructors) {
            return res.send("A lista de instrutores ainda não foi criada")
        } // Verificar esta condicional após criação do banco de dados

        let {avatar_url, name, birth, gender, services} = req.body
        const id = Number(data.instructors.length + 1)
        const created_at = Date.now()

        birth = Date.parse(birth)

        data.instructors.push({
            id,
            avatar_url,
            name,
            birth,
            gender,
            services,
            created_at
        })

        fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
            if(err){
                return res.send("Erro na escrita do arquivo")
            }

            return res.redirect("/instructors")
        })
    }
}