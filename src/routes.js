// Declarando Variáveis Globais (require)

const express = require('express')

const home_page = require('./app/controllers/home/home_page')

const instructors_list = require('./app/controllers/instructors/instructors_list')
const new_instructor = require('./app/controllers/instructors/new_instructor')
const selected_instructor = require('./app/controllers/instructors/selected_instructor')
const edit_instructor = require('./app/controllers/instructors/edit_instructor')

const members_list = require('./app/controllers/members/members_list')
const new_member = require('./app/controllers/members/new_member')
const selected_member = require('./app/controllers/members/selected_member')
const edit_member = require('./app/controllers/members/edit_member')

const routes = express.Router()


// Configurando Rotas


// Home

routes.get("/", home_page.redirect)
routes.get("/home", home_page.redirect)


// Instructors

routes.get("/instructors", instructors_list.index)

routes.get("/instructors/new", new_instructor.index)
routes.post("/instructors/new", new_instructor.create)

routes.get("/instructors/selected_instructor", selected_instructor.redirect)
routes.get("/instructors/selected_instructor/:id", selected_instructor.index)

routes.get("/instructors/edit_instructor", edit_instructor.redirect)
routes.get("/instructors/edit_instructor/:id", edit_instructor.index)
routes.put("/instructors/edit_instructor", edit_instructor.update)
routes.delete("/instructors/edit_instructor", edit_instructor.delete)


// Members

routes.get("/members", members_list.index)

routes.get("/members/new", new_member.index)
routes.post("/members/new", new_member.create)

routes.get("/members/selected_member", selected_member.redirect)
routes.get("/members/selected_member/:id", selected_member.index)

routes.get("/members/edit_member", edit_member.redirect)
routes.get("/members/edit_member/:id", edit_member.index)
routes.put("/members/edit_member", edit_member.update)
routes.delete("/members/edit_member", edit_member.delete)


// Exportando Módulo

module.exports = routes