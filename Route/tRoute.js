const router = require('express').Router();
const { getIndex, getBoardIndex } = require('../Controller/gestion-projet/main-controller')
const { saveBoardItem, getBoardsItems, deleteBoardItem, updateBoardItem } = require('../Controller/gestion-projet/board-controller');
const { postList, deleteList, updateList } = require('../Controller/gestion-projet/list-controller');
const { postListItem, postMoveListItem, deleteListItem, getListItem, updateItemRange, updateListItem } = require('../Controller/gestion-projet/listitem-controller');

router.get('/', getIndex);
router.route('/board-item').get(getBoardsItems).post(saveBoardItem);
router.route('/board-item/:id').get(getBoardIndex).delete(deleteBoardItem).put(updateBoardItem);
// list
router.route('/list/:id').post(postList).put(updateList);
router.route('/list/delete/:id').delete(deleteList);
// list item
router.route('/listitem').post(postListItem);
router.route('/listitem/:id').get(getListItem).put(updateListItem).delete(deleteListItem);
// move list item
router.route('/movelistitem').post(postMoveListItem);
router.route('/updatelistitemrange').put(updateItemRange);


module.exports = router;