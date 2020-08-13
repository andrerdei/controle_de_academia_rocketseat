// Declarando Variáveis Globais (require)

const editMemberModel = require('../../../app/models/members/edit_member')

const {genderConverter} = require('../../../lib/utils/gender_converter')
const {dateConverterBuggedTimestamp} = require('../../../lib/utils/date_converter')
const e = require('express')


// Exportando Módulo Com o Controller

module.exports = {
    redirect(req, res) {
        return res.redirect("edit_member/1")
    },

    index(req, res) {        
        const paramsData = req.params

        editMemberModel.showEditingMember(paramsData, (data) => {
            const findMember = data.find((member) => {
                return member.id == paramsData.id
            })

            if(!findMember) {
                return res.send("Membro não encontrado, tente novamente")
            }
    
            const member = {
                ...findMember,
    
                birth: dateConverterBuggedTimestamp(findMember.birth).dashFormattedDateReverse,
                gender: genderConverter(findMember.gender)
            }

            const instructorOptions = []
            
            data.forEach((member) => {
                instructorOptions.push({
                    instructor_id: member.instructor_id,
                    instructor_name: member.instructor_name
                })
            })

          console.log(instructorOptions)
    
            return res.render("members/edit_member", {member: member, instructorOptions: instructorOptions})
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

        bodyData.id = Number(bodyData.id)
        bodyData.weight = Number(bodyData.weight)
        bodyData.height = Number(bodyData.height)
        bodyData.responsible_instructor_id = Number(bodyData.responsible_instructor_id)

        editMemberModel.updateEditingMember(bodyData, () => {
            res.redirect(`/members/selected_member/${bodyData.id}`)
        })
    },

    delete(req, res) {
        const bodyData = req.body

        bodyData.id = Number(bodyData.id)

        editMemberModel.deleteEditingMember(bodyData, () => {
            return res.redirect("/members")
        })
    }
}