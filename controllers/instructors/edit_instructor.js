// Declarando Variáveis Globais (require)

const fs = require('fs')
const data = require('../../data.json')

const {genderConverter} = require('../../utils/gender_converter')
const {infoCommaSplitter} = require('../../utils/info_splitter')
const {dateConverterReverse} = require('../../utils/date_converter')


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

            birth: dateConverterReverse(findInstructor.birth),
            gender: genderConverter(findInstructor.gender),
            services: infoCommaSplitter(findInstructor.services)
        }

        return res.render("instructors/edit_instructor", {instructor: instructor})
    },

    async update(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == "" || req.body.gender == undefined) {
                return res.send("Preencha Todos os Campos!")
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

            birth: Date.parse(birth)
        }

        fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
            if(err){
                return res.send("Erro na escrita do arquivo")
            }

            return res.redirect(`/instructors/selected_instructor/${id}`)
        })
    },

    async delete(req, res) {
        const {id} = req.body

        const filterInstructors = data.instructors.filter((instructor, currentIndex) => {
            return instructor.id != id
        })

        data.instructors = filterInstructors

        fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
            if(err) {
                return res.send("Erro na escrita do arquivo")
            }

            return res.redirect("/instructors")
        })
    }
}