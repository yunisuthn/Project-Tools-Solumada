const mongoose = require('mongoose')
const tboard = mongoose.Schema({
    title: String,
    theme: String,
    owner: String,
});
module.exports = mongoose.model('TBoard', tboard);