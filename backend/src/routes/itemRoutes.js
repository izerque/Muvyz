const express = require('express');
const { addItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/itemController');
const router = express.Router();

router.post('/', addItem);
router.get('/', getItems);
router.get('/:id', getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
