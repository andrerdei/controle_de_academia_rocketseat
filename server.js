// Declarando Variáveis (require)

const express = require('express')
const nunjucks = require('nunjucks')

const routes = require('./routes')
const server = express()


// Configurando Middlewares

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(routes)

// Configurando Template Engine (Nunjucks)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})


// Inicializando o Servidor

server.listen(5000, () => {
    console.log("server is running")
})