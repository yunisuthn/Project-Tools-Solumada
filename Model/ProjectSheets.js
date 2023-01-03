const mongoose = require('mongoose')

const ProjectSheets = mongoose.Schema({
    type: String,
    option:String,
    name: String,
    project_leader: String,
    team_leader: String,
    date_start: String
    
})

module.exports = mongoose.model('ProjectSheets', ProjectSheets)