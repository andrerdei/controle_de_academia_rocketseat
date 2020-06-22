// Declarando Variáveis Globais (require)

const fs = require('fs')
const data = require('../data.json')


// Exportando Módulo Com os Controllers

module.exports = {
    async create(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Preencha Todos os Campos!")
            }
        }

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
        
            return res.redirect('/instructors')
        })
    }
}