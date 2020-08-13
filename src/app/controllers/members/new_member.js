// Declarando Variáveis Globais (require)

const newMemberModel = require('../../../app/models/members/new_member')

const {dateConverter} = require('../../../lib/utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    index (req, res) {
        newMemberModel.selectResponsibleInstructorOptions((data) => {
            const instructorOptions = data

            return res.render("members/new_member", {instructorOptions: instructorOptions})
        })
    },

    create(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""
            || req.body.gender == undefined
            || req.body.blood_type == undefined) {

                return res.send("Preencha todos os campos corretamente")

            }
        }

        const bodyData = req.body
        const created_at = Date.now()

        bodyData.weight = Number(bodyData.weight)
        bodyData.height = Number(bodyData.height)
        bodyData.responsible_instructor_id = Number(bodyData.responsible_instructor_id)
        bodyData.created_at = dateConverter(created_at).dashFormattedDateReverse

        newMemberModel.createNewMember(bodyData, () => {
            return res.redirect("/members")
        })
    }
}