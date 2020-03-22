// Declarando Variáveis (require)

const express = require('express')
const routes = express.Router()


// Configurando Rotas (get)

routes.get("/", (req, res) => {
    return res.render("instructors")
})

routes.get("/instructors", (req, res) => {
    return res.render("instructors/index")
})

routes.get("/instructors/create", (req, res) => {
    return res.render("instructors/create")
})


// Configurando Rotas (post)

routes.post("/instructors", (req, res) => {
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Preencha Todos os Campos!")
        }
    }

    return res.send(req.body)
})


// Exportando Módulo

module.exports = routes