const mongoose = require('mongoose')
const tlist = mongoose.Schema({
    title: String,
    boardId: mongoose.Types.ObjectId,
    owner: String,
});
module.exports = mongoose.model('TList', tlist)