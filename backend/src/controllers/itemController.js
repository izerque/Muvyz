const db = require('../models');
const Item = db.Item;

const addItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.status(200).send(item);
    } else {
      res.status(404).send({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const [updated] = await Item.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedItem = await Item.findByPk(req.params.id);
      res.status(200).send(updatedItem);
    } else {
      res.status(404).send({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.status(200).send({ message: 'Item deleted' });
    } else {
      res.status(404).send({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addItem,
  getItems,
  getItem,
  updateItem,
  deleteItem
};
