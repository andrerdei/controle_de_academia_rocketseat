// Declarando Variáveis Globais (require)

const selectedInstructorModel = require('../../../app/models/instructors/selected_instructor')

const {ageConverter} = require('../../../lib/utils/age_converter')
const {genderConverter} = require('../../../lib/utils/gender_converter')
const {infoCommaSplitter} = require('../../../lib/utils/info_splitter')
const {dateConverter} = require('../../../lib/utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    redirect(req, res) {
        return res.redirect("selected_instructor/1")
    },
    
    index(req, res) {
        const paramsData = req.params

        selectedInstructorModel.showSelectedInstructor(paramsData, (data) => {
            const findInstructor = data.find((instructor) => {    
                return instructor.id == paramsData.id
            })

            if(!findInstructor) {
                return res.send("Instrutor não encontrado, tente novamente")
            }

            const instructor = {
                ...findInstructor,
    
                age: ageConverter(findInstructor.birth),
                birth: dateConverter(findInstructor.birth).slashFormattedDate,
                gender: genderConverter(findInstructor.gender),
                services: infoCommaSplitter(findInstructor.services),
                total_students: Number(findInstructor.total_students),
                created_at: dateConverter(findInstructor.created_at).slashFormattedDate
            }

            return res.render("instructors/selected_instructor", {instructor: instructor})
        })
    }
}