const express = require('express')
const routeExp = express.Router()
const mongoose = require('mongoose')


//index
routeExp.route('/').get(async function(req, res) {
    res.render("index.html")
})

routeExp.route('/IT').get(async function(req, res){
    res.render("./it/IT.html")
})

routeExp.route('/operation').get( async function(req, res) {
    res.render("./operation/evaluationTL.html")
})

routeExp.route('/production').get(async function(req, res){
    res.render("./production/production.html")
})

routeExp.route('/inventaire').get(async function(req, res){
    res.render("./it/inventaire.html")
})
module.exports = routeExp