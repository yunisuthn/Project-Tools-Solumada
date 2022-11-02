const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://Rica:ryane_jarello5@cluster0.z3s3n.mongodb.net/Pointage?retryWrites=true&w=majority');

const Leave = new mongoose.Schema({
    m_code: String,
    num_agent: String,
    nom: String,
    date_start: String,
    date_end: String,
    duration: Number,
    type: String,
    status: String,
    rest: Number,
    validation: Boolean
})
module.exports = connection.model('cleave', Leave);