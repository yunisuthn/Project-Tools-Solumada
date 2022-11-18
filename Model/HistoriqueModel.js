const mongoose = require('mongoose');

const historique = mongoose.Schema({
    user: String,
    model: String,
    crud: String,
    date: Date,
    old: Object,
    new: Object
})

module.exports = mongoose.model('Historique', historique)