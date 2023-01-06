const mongoose = require("mongoose");

const reporting = mongoose.Schema({
    mcode: String,
    name: String,
    prenom: String,
    number: String,
    production: String,
    //projet: Array,
    date: Date,
    //end: Date
})

module.exports = mongoose.model('Production', reporting)