// Declarando Variáveis Globais (require)

const fs = require('fs')
const data = require('../../../../data.json')

const {genderConverter} = require('../../../lib/utils/gender_converter')
const {dateConverterBuggedTimestamp} = require('../../../lib/utils/date_converter')


// Exportando Módulo Com o Controller

module.exports = {
    async redirect(req, res) {
        return res.redirect("edit_member/1")
    },

    async index(req, res) {
        if(!data.members) {
            return res.send("A lista de membros ainda não foi criada")
        } // Verificar esta condicional após criação do banco de dados
        
        const {id} = req.params

        const findMember = data.members.find((member) => {
            return member.id == id
        })

        if(!findMember) {
            return res.send("Membro não encontrado, tente novamente")
        }

        const member = {
            ...findMember,

            birth: dateConverterBuggedTimestamp(findMember.birth).dashFormattedDateReverse,
            gender: genderConverter(findMember.gender)
        }

        return res.render("members/edit_member", {member: member})
    },

    async update(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""
            || req.body.gender == undefined
            || req.body.blood_type == undefined) {

                return res.send("Preencha todos os campos corretamente")

            }
        }

        const {id, birth, height, weight} = req.body

        let index = 0

        const findMember = data.members.find((member, currentIndex) => {
            if(member.id == id) {
                index = currentIndex
                return true
            }
        })

        if(!findMember) {
            return res.send("Membro não encontrado, tente novamente")
        }
        
        data.members[index] = {
            ...findMember,
            ...req.body,

            id: Number(id),
            birth: Date.parse(birth),
            height: Number(height),
            weight: Number(weight)
        }
        
        fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
            if(err){
                return res.send("Erro na escrita do arquivo")
            }
        })
        
        res.redirect(`/members/selected_member/${id}`)
    },

    async delete(req, res) {
        const {id} = req.body

        const filterMembers = data.members.filter((member) => {
            return member.id != id
        })

        data.members = filterMembers

        fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
            if(err) {
                return res.send("Erro na escrita do arquivo")
            }
        })

        return res.redirect("/members")
    }
}