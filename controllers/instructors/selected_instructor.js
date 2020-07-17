// Declarando Variáveis Globais (require)

const data = require('../../data.json')

const {ageConverter} = require('../../utils/age_converter')
const {genderConverter} = require('../../utils/gender_converter')
const {infoCommaSplitter} = require('../../utils/info_splitter')
const {dateConverter, dateConverterBuggedTimestamp} = require('../../utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    async redirect(req, res) {
        return res.redirect("selected_instructor/1")
    },
    async index(req, res) {
        if(!data.instructors) {
            return res.send("A lista de instrutores ainda não foi criada")
        } // Verificar esta condicional após criação do banco de dados
        
        const {id} = req.params

        const findInstructor = data.instructors.find((instructor) => {
            return instructor.id == id
        })

        if(!findInstructor) {
            return res.send("Instrutor não encontrado, tente novamente")
        }

        const instructor = {
            ...findInstructor,

            age: ageConverter(findInstructor.birth),
            birth: dateConverterBuggedTimestamp(findInstructor.birth).slashFormattedDate,
            gender: genderConverter(findInstructor.gender),
            services: infoCommaSplitter(findInstructor.services),
            created_at: dateConverter(findInstructor.created_at).slashFormattedDate
        }
        
        return res.render("instructors/selected_instructor", {instructor: instructor})
    }
}