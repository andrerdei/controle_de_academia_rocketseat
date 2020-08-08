// Declarando Variáveis Globais (require)

const newInstructorModel = require('../../../app/models/instructors/new_instructor')

const {dateConverter} = require('../../../lib/utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    index (req, res) {
        return res.render("instructors/new_instructor")
    },

    create(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""
            || req.body.gender == undefined) {

                return res.send("Preencha todos os campos corretamente")
                
            }
        }

        const bodyData = req.body
        const created_at = Date.now()

        bodyData.created_at = dateConverter(created_at).dashFormattedDateReverse

        newInstructorModel.createNewInstructor(bodyData, () => {
            return res.redirect("/instructors")
        })  
    }
}