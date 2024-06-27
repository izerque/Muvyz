const express = require("express");
const {
  addMuvy,
  getMuvies,
  getMuvy,
  updateMuvy,
  deleteMuvy,
} = require("../controllers/muvy_controlers");
const router = express.Router();

router.post("/", addMuvy);
router.get("/", getMuvies);
router.get("/:id", getMuvy);
router.put("/:id", updateMuvy);
router.delete("/:id", deleteMuvy);

module.exports = router;
