// Declarando Variáveis Globais (require)

const express = require('express')

const home_page = require('./controllers/home_page')

const instructors_list = require('./controllers/instructors/instructors_list')
const new_instructor = require('./controllers/instructors/new_instructor')
const selected_instructor = require('./controllers/instructors/selected_instructor')

const routes = express.Router()


// Configurando Rotas

routes.get("/", home_page.redirect)

routes.get("/instructors", instructors_list.index)

routes.get("/instructors/new", new_instructor.index)
routes.post("/instructors/new", new_instructor.create)

routes.get("/instructors/selected_instructor", selected_instructor.redirect)
routes.get("/instructors/selected_instructor/:id", selected_instructor.index)


// Exportando Módulo

module.exports = routes