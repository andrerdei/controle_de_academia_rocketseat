// Declarando Variáveis Globais (require)

const data = require('../../../../data.json')

const {ageConverter} = require('../../../lib/utils/age_converter')


// Exportando Módulo Com o Controller

module.exports = {
    async index(req, res) {
        if(!data.instructors) {
            return res.send("A lista de instrutores ainda não foi criada")
        } // Verificar esta condicional após criação do banco de dados

        const instructors = []

        data.instructors.forEach((instructor) => {
            instructor.age = ageConverter(instructor.birth),
            instructors.push(instructor)
        })

        return res.render("instructors/instructors_list", {instructors: instructors})
    }
}