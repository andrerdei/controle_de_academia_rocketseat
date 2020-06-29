// Declarando Variáveis Globais (require)

const data = require('../../data.json')

const {ageConverter} = require('../../utils/age_converter')
const {genderConverter} = require('../../utils/gender_converter')
const {infoCommaSplitter} = require('../../utils/info_splitter')
const {dateConverter} = require('../../utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    async redirect(req, res) {
        return res.redirect("edit_instructor/1")
    },

    async index(req, res) {
        const {id} = req.params

        const findInstructor = data.instructors.find((instructor) => {
            return instructor.id == id
        })

        if(!findInstructor) {
            return res.send("Instrutor não encontrado, tente novamente")
        }

        const instructor = {
            ...findInstructor,

            birth: ageConverter(findInstructor.birth),
            gender: genderConverter(findInstructor.gender),
            services: infoCommaSplitter(findInstructor.services),
            created_at: dateConverter(findInstructor.created_at)
        }
        
        return res.render("instructors/edit_instructor", {instructor: instructor})
    }
}