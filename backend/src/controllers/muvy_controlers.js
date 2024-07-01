const db = require("../models");
const Muvy = db.Muvy;

// Add a new Muvy
const addMuvy = async (req, res) => {
  try {
    const muvy = await Muvy.create(req.body);
    res.status(201).send(muvy);
  } catch (error) {
    console.error('Error adding movie:', error.message);
    res.status(500).send({ message: error.message });
  }
};

// Get all Muvies
const getMuvies = async (req, res) => {
  try {
    const muvies = await Muvy.findAll();
    res.status(200).send(muvies);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    res.status(500).send({ message: error.message });
  }
};

// Get a specific Muvy by ID
const getMuvy = async (req, res) => {
  try {
    const muvy = await Muvy.findByPk(req.params.id);
    if (muvy) {
      res.status(200).send(muvy);
    } else {
      res.status(404).send({ message: "Muvy not found" });
    }
  } catch (error) {
    console.error('Error fetching movie:', error.message);
    res.status(500).send({ message: error.message });
  }
};

// Update a Muvy
const updateMuvy = async (req, res) => {
  try {
    const [updated] = await Muvy.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedMuvy = await Muvy.findByPk(req.params.id);
      res.status(200).send(updatedMuvy);
    } else {
      res.status(404).send({ message: "Muvy not found" });
    }
  } catch (error) {
    console.error('Error updating movie:', error.message);
    res.status(500).send({ message: error.message });
  }
};

// Delete a Muvy
const deleteMuvy = async (req, res) => {
  try {
    const deleted = await Muvy.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(200).send({ message: "Muvy deleted" });
    } else {
      res.status(404).send({ message: "Muvy not found" });
    }
  } catch (error) {
    console.error('Error deleting movie:', error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addMuvy,
  getMuvies,
  getMuvy,
  updateMuvy,
  deleteMuvy,
};
