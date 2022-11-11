const mongoose = require('mongoose');
const tlistitem = mongoose.Schema({
    title: String,
    range: {
        type: Number,
        default: 0
    },
    theme: {
        type: String,
        default: '#fff'
    },
    boardId: mongoose.Types.ObjectId,
    parent: mongoose.Types.ObjectId,
    owner: String,
    members: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ""
    },
    checklist: {
        type: Array,
        default: []
    },
    activity: {
        type: String,
        default: ""
    },
});
module.exports = mongoose.model('TListItem', tlistitem)