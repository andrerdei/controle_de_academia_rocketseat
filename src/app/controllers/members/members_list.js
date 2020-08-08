// Declarando Variáveis Globais (require)

const db = require('../../../config/db')

const {ageConverter} = require('../../../lib/utils/age_converter')


// Exportando Módulo Com o Controller

module.exports = {
    index(req, res) {
        const query = `
            SELECT * FROM members
        `
        
        db.query(query, (err, results) => {
            if(err) {
                return res.send("Erro ao conectar com o banco de dados, tente novamente")
            }

            const members = results.rows

            members.forEach((member) => {
                member.age = ageConverter(member.birth)
            })

            return res.render("members/members_list", {members: members})
        })
    }
}