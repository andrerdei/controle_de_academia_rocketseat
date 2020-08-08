// Declarando Variáveis Globais (require)

const db = require('../../../config/db')

const {ageConverter} = require('../../../lib/utils/age_converter')
const {genderConverter} = require('../../../lib/utils/gender_converter')
const {dateConverter} = require('../../../lib/utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    redirect(req, res) {
        return res.redirect("selected_member/1")
    },
    index(req, res) {
        const {id} = req.params

        const query = `
            SELECT * FROM members
        `

        db.query(query, (err, results) => {
            if(err) {
                res.send("Erro ao conectar com o banco de dados, tente novamente")
            }

            const members = results.rows

            const findMember = members.find((member) => {
                return member.id == id
            })

            if(!findMember) {
                return res.send("Membro não encontrado, tente novamente")
            }

            const member = {
                ...findMember,
    
                age: ageConverter(findMember.birth),
                birth: dateConverter(findMember.birth).slashFormattedDate,
                gender: genderConverter(findMember.gender),
                created_at: dateConverter(findMember.created_at).slashFormattedDate
            }

            return res.render("members/selected_member", {member: member})
        })
    }
}