// Declarando Variáveis Globais (require)

const selectedMemberModel = require('../../../app/models/members/selected_member')

const {ageConverter} = require('../../../lib/utils/age_converter')
const {genderConverter} = require('../../../lib/utils/gender_converter')
const {dateConverter} = require('../../../lib/utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    redirect(req, res) {
        return res.redirect("selected_member/1")
    },

    index(req, res) {
        const paramsData = req.params

        selectedMemberModel.showSelectedMember(paramsData, (data) => {
            const findMember = data

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