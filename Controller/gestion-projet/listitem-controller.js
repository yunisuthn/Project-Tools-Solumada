const { default: mongoose } = require("mongoose");
const TList = require("../../Model/TList");
const TListItem = require("../../Model/TListItem");

const getListItems = async (filter = {}) => await TListItem.find(filter).sort({ "range": "asc" });

const getListItem = async (req, res) => {
    try {
        const list = await TListItem.findById(mongoose.Types.ObjectId(req.params.id));
        const parent = await TList.findById(mongoose.Types.ObjectId(list.parent));
        
        return res.send({
            status: 1,
            list: list,
            parent: parent,
        });
    } catch (error) {
        console.log(error)
        return res.send({ status: 0 });
    }
}

const postListItem = async (req, res) => {
    try {
        const { title, parent, boardid } = req.body;
        const newListItem = await new TListItem({
            title: title,
            parent: mongoose.Types.ObjectId(parent),
            boardId: mongoose.Types.ObjectId(boardid),
            owner: req.session.mcode,
            members: [req.session.mcode]
        }).save();
        res.send({
            status: 1,
            newListItem: newListItem,
        });
    } catch (error) {
        console.log(error);
        res.send({ status: 0 });
    }    
}

// make move (drag&drop)
const postMoveListItem = async (req, res) => {
    try {
        const { child, parent } = req.body;
        await TListItem.findByIdAndUpdate(
            mongoose.Types.ObjectId(child), {
            parent: mongoose.Types.ObjectId(parent),
        });
        res.send({
            status: 1,
        });
    } catch (error) {
        console.log(error)
        res.send({ status: 0 });
    }    
}

// delete list item
const deleteListItem = async (req, res) => {
    try {
        const id = req.params.id;
        await TListItem.findByIdAndDelete(mongoose.Types.ObjectId(id));
        res.send({
            status: 1,
        });
    } catch (error) {
        console.log(error)
        res.send({ status: 0 });
    }    
}

const updateItemRange = async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        // update range by the data id
        data.forEach(async e => {
            await TListItem.findByIdAndUpdate(mongoose.Types.ObjectId(e.id), { range: e.range });
        });

        res.send({ status: 1 });
    } catch (error) {
        console.log(error)
        res.send({ status: 0 });
    }
}
// update list item

const updateListItem= async (req, res) => {
    try {
        const id = req.params.id;
        const data = JSON.parse(req.body.data);
        console.log(data)
        // update list item by id
        const updated = await TListItem.findByIdAndUpdate(mongoose.Types.ObjectId(id), data);

        res.send({ status: 1, updated: updated });
    } catch (error) {
        console.log(error)
        res.send({ status: 0 });
    }
}

module.exports = { postListItem, getListItems, postMoveListItem, deleteListItem, getListItem, updateItemRange, updateListItem }