const TBoard = require('../../Model/TBoard');
const TList = require("../../Model/TList");
const TListItem = require("../../Model/TListItem");

const tBoardList = async (filter = {}) => await TBoard.find(filter);
// Board
const saveBoardItem = async (req, res) => {
    const board = req.body;
    board.owner = req.session.mcode;
    try {
        const createdBoard = new TBoard(board).save();
        res.send({
            board: await createdBoard,
            status: 1
        });
    } catch (e) {
        res.send({
            status: 0
        });
    }
}
// get Board lists
const getBoardsItems = async (req, res) => {
    const boards = await tBoardList();
    res.send({
        boards: boards,
        status: 1
    });
}
// delete board item

const deleteBoardItem = async (req, res) => {
    try {
        const { id } = req.params;
        const mongoose = require('mongoose');
        const board = await TBoard.findByIdAndDelete(mongoose.Types.ObjectId(id));
        // delete board item
        await TList.find({ boardId: mongoose.Types.ObjectId(id) });
        // delete all listitems
        await TListItem.deleteMany({ boardId: mongoose.Types.ObjectId(id) });
        // delete all lists
        await TList.deleteMany({ boardId: mongoose.Types.ObjectId(id) });

        res.send({
            deletedBoard: board,
            status: 1
        });
    } catch (error) {
        res.send({
            status: 0
        });
    }
}

const updateBoardItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const mongoose = require('mongoose');
        const board = await TBoard.findByIdAndUpdate(mongoose.Types.ObjectId(id), { title: title });
        res.send({
            updatedBoard: board,
            status: 1
        });
    } catch (error) {
        res.send({
            status: 0
        });
    }
}

// update board

module.exports = { saveBoardItem, getBoardsItems, deleteBoardItem, updateBoardItem, tBoardList }