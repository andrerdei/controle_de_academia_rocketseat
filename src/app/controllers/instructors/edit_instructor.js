// Declarando Variáveis Globais (require)

const editInstructorModel = require('../../../app/models/instructors/edit_instructor')

const {genderConverter} = require('../../../lib/utils/gender_converter')
const {infoCommaSplitter} = require('../../../lib/utils/info_splitter')
const {dateConverter} = require('../../../lib/utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    redirect(req, res) {
        return res.redirect("edit_instructor/1")
    },

    index(req, res) {
        const paramsData = req.params

        editInstructorModel.showEditingInstructor(paramsData, (data) => {
            const findInstructor = data

            if(!findInstructor) {
                return res.send("Instrutor não encontrado, tente novamente")
            }

            const instructor = {
                ...findInstructor,

                birth: dateConverter(findInstructor.birth).dashFormattedDateReverse,
                gender: genderConverter(findInstructor.gender),
                services: infoCommaSplitter(findInstructor.services)
            }

            return res.render("instructors/edit_instructor", {instructor: instructor})
        })
    },

    update(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""
            || req.body.gender == undefined) {

                return res.send("Preencha todos os campos corretamente")
                
            }
        }

        const bodyData = req.body

        bodyData.id = Number(bodyData.id)

        editInstructorModel.updateEditingInstructor(bodyData, (data) => {
            res.redirect(`/instructors/selected_instructor/${data.id}`)
        })
    },
    
    delete(req, res) {
        const bodyData = req.body

        bodyData.id = Number(bodyData.id)

        editInstructorModel.deleteEditingInstructor(bodyData, () => {
            return res.redirect("/instructors")
        })
    }
}