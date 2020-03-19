// Declarando Variáveis (require)

const express = require('express')
const routes = express.Router()


// Configurando Rotas

routes.get("/", (req, res) => {
    return res.render("instructors/index")
})

routes.get("/members", (req, res) => {
    return res.render("members")
})


// Exportando Módulo

module.exports = routes