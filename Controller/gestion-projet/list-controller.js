const mongoose = require('mongoose');
const TList = require("../../Model/TList");
const TListItem = require("../../Model/TListItem");

// get list by board id
const getListbyBoardId = async (boardId) => {
    const list = await TList.find({ boardId: boardId });
    return list;
}

const postList = async (req, res) => {
    try {
        const { title } = req.body;
        const addedList = new TList({ title: title, boardId: mongoose.Types.ObjectId(req.params.id), owner: req.session.mcode }).save();
        res.send({
            status: 1,
            addedList: await addedList
        });
    } catch (error) {
        res.send({ status: 0 });
    }
}

const deleteList = async (req, res) => {
    try {
        const { id } = req.params;
        // delete list
        const deletedList = await TList.findByIdAndDelete(mongoose.Types.ObjectId(id));
        // delete list item
        await TListItem.deleteMany({parent: mongoose.Types.ObjectId(id)})
        res.send({
            status: 1,
            deletedList: deletedList
        });
    } catch (error) {
        res.send({ status: 0 });
    }
}

const updateList = async (req, res) => {
    try {
        const { id, title } = req.body;
        // update list
        await TList.findByIdAndUpdate(mongoose.Types.ObjectId(id), { title: title });
        res.send({
            status: 1,
            newTitle: title
        });
    } catch (error) {
        res.send({ status: 0 });
    }
}


module.exports = { getListbyBoardId, postList, deleteList, updateList };