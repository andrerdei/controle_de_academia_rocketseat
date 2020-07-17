// Declarando Variáveis Globais (require)

const data = require('../../data.json')

const {ageConverter} = require('../../utils/age_converter')
const {genderConverter} = require('../../utils/gender_converter')
const {dateConverter, dateConverterBuggedTimestamp} = require('../../utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    async redirect(req, res) {
        return res.redirect("selected_member/1")
    },
    async index(req, res) {
        if(!data.members) {
            return res.send("A lista de membros ainda não foi criada")
        } // Verificar esta condicional após criação do banco de dados
        
        const {id} = req.params

        const findMember = data.members.find((member) => {
            return member.id == id
        })

        if(!findMember) {
            return res.send("Membro não encontrado, tente novamente")
        }

        const member = {
            ...findMember,

            age: ageConverter(findMember.birth),
            birth: dateConverterBuggedTimestamp(findMember.birth).slashFormattedDate,
            gender: genderConverter(findMember.gender),
            created_at: dateConverter(findMember.created_at).slashFormattedDate
        }
        
        return res.render("members/selected_member", {member: member})
    }
}