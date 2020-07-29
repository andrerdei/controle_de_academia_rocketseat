// Declarando Variáveis Globais (require)

const fs = require('fs')
const data = require('../../../../data.json')

const {genderConverter} = require('../../../lib/utils/gender_converter')
const {infoCommaSplitter} = require('../../../lib/utils/info_splitter')
const {dateConverterBuggedTimestamp} = require('../../../lib/utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    async redirect(req, res) {
        return res.redirect("edit_instructor/1")
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

            birth: dateConverterBuggedTimestamp(findInstructor.birth).dashFormattedDateReverse,
            gender: genderConverter(findInstructor.gender),
            services: infoCommaSplitter(findInstructor.services)
        }

        return res.render("instructors/edit_instructor", {instructor: instructor})
    },

    async update(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""
            || req.body.gender == undefined) {

                return res.send("Preencha todos os campos corretamente")
                
            }
        }

        const {id, birth} = req.body

        let index = 0

        const findInstructor = data.instructors.find((instructor, currentIndex) => {
            if(instructor.id == id) {
                index = currentIndex
                return true
            }
        })

        if(!findInstructor) {
            return res.send("Instrutor não encontrado, tente novamente")
        }
        
        data.instructors[index] = {
            ...findInstructor,
            ...req.body,

            id: Number(id),
            birth: Date.parse(birth)
        }
        
        fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
            if(err){
                return res.send("Erro na escrita do arquivo")
            }
        })
        
        res.redirect(`/instructors/selected_instructor/${id}`)
    },

    async delete(req, res) {
        const {id} = req.body

        const filterInstructors = data.instructors.filter((instructor) => {
            return instructor.id != id
        })

        data.instructors = filterInstructors

        fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
            if(err) {
                return res.send("Erro na escrita do arquivo")
            }
        })

        return res.redirect("/instructors")
    }
}