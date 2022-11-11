const mongoose = require('mongoose');
const { tBoardList } = require('./board-controller');
const { getListbyBoardId } = require('./list-controller');
const { getListItems } = require('./listitem-controller');

mongoose
.connect(
    "mongodb+srv://solumada:solumada@cluster0.xdzjimf.mongodb.net/?retryWrites=true&w=majority",
    {
        useUnifiedTopology: true,
        UseNewUrlParser: true,
    }
)
.then(async () => {

}).catch(eror => {
    console.Console('error');
});

/** */
const getIndex = async (req, res) => {
    if (req.session.mcode) {
        const context = {
            boardId: null,
            boards: await tBoardList({ owner: req.session.mcode }),
            type_util: req.session.typeUtil
        }
        return res.render('gestion-projet/accueil.html', context);
    }
    return res.redirect('/');
}


const getBoardIndex = async (req, res) => {
    if (req.session.mcode) {
        try {
            // get board id
            const { id } = req.params;
            const context = {
                boardId: id,
                boards: await tBoardList({ owner: req.session.mcode }),
                lists: await getListbyBoardId(mongoose.Types.ObjectId(id)),
                listItems: await getListItems({boardId: mongoose.Types.ObjectId(id)}),
                type_util: req.session.typeUtil
            }
            return res.render('gestion-projet/page.html', context);
        } catch (error) {
            throw error;
        }
    } 
    return res.redirect('/');
}

module.exports = { getIndex, getBoardIndex }