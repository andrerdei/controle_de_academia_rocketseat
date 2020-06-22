// Declarando Variáveis (require)

const express = require('express')

const instructors = require('./controllers/instructors')

const routes = express.Router()


// Configurando Rotas (get)

routes.get("/", (req, res) => {
    return res.redirect("/instructors")
})

routes.get("/instructors", (req, res) => {
    return res.render("instructors/instructors_list")
})

routes.get("/instructors/new", (req, res) => {
    return res.render("instructors/new_instructor")
})


// Configurando Rotas (post)

routes.post("/instructors", instructors.create)


// Exportando Módulo

module.exports = routes