// Declarando Variáveis Globais (require)

const editMemberModel = require('../../../app/models/members/edit_member')

const {genderConverter} = require('../../../lib/utils/gender_converter')
const {dateConverterBuggedTimestamp} = require('../../../lib/utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    redirect(req, res) {
        return res.redirect("edit_member/1")
    },

    index(req, res) {        
        const paramsData = req.params

        editMemberModel.showEditingMember(paramsData, (data) => {
            const findMember = data

            if(!findMember) {
                return res.send("Membro não encontrado, tente novamente")
            }
    
            const member = {
                ...findMember,
    
                birth: dateConverterBuggedTimestamp(findMember.birth).dashFormattedDateReverse,
                gender: genderConverter(findMember.gender)
            }
    
            return res.render("members/edit_member", {member: member})
        })
    },

    update(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""
            || req.body.gender == undefined
            || req.body.blood_type == undefined) {

                return res.send("Preencha todos os campos corretamente")

            }
        }

        const bodyData = req.body

        editMemberModel.updateEditingMember(bodyData, (data) => {
            res.redirect(`/members/selected_member/${data.id}`)
        })
    },

    delete(req, res) {
        const bodyData = req.body

        editMemberModel.deleteEditingMember(bodyData, () => {
            return res.redirect("/members")
        })
    }
}