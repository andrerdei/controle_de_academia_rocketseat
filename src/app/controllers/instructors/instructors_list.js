// Declarando Variáveis Globais (require)

const instructorsListModel = require('../../../app/models/instructors/instructors_list')

const {ageConverter} = require('../../../lib/utils/age_converter')


// Exportando Módulo Com o Controller

module.exports = {
    index(req, res) {
        instructorsListModel.showInstructorsList((data) => {
            const instructors = data

            if(!instructors) {
                return res.send("Instrutores não encontrados, tente novamente")
            }

            instructors.forEach((instructor) => {
                instructor.age = ageConverter(instructor.birth)
                instructor.total_studants = Number(instructor.total_students)
            })
            
            return res.render("instructors/instructors_list", {instructors: instructors})
        })
    }
}