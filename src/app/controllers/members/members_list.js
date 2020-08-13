// Declarando Variáveis Globais (require)

const membersListModel = require('../../../app/models/members/members_list')

const {ageConverter} = require('../../../lib/utils/age_converter')


// Exportando Módulo Com o Controller

module.exports = {
    index(req, res) {
        membersListModel.showMembersList((data) => {
            const members = data

            if(!members) {
                return res.send("Membros não encontrados, tente novamente")
            }
    
            members.forEach((member) => {
                member.age = ageConverter(member.birth)
            })
    
            return res.render("members/members_list", {members: members})
        })
    }
}