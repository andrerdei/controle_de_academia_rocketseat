// Declarando Variáveis Globais (require)

const data = require('../../data.json')

const {ageConverter} = require('../../utils/age_converter')


// Exportando Módulo Com o Controller

module.exports = {
    async index(req, res) {
        if(!data.members) {
            return res.send("A lista de membros ainda não foi criada")
        } // Verificar esta condicional após criação do banco de dados

        const members = []

        data.members.forEach((member) => {
            member.age = ageConverter(member.birth),
            members.push(member)
        })

        return res.render("members/members_list",{members: members})
    }
}