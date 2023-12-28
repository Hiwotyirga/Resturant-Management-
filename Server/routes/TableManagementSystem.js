const express = require("express");
const router = express.Router();

const { TableManagementSystem } = require("../models");

router.get("/", async (req, res) => {
  try {
    const table = await TableManagementSystem.findAll();
    res.json(table);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { TableNumber, indoor, SeatCapacity, VIP, Note } = req.body;
  const Post = { TableNumber, indoor, SeatCapacity, VIP, Note };

  try {
    await TableManagementSystem.create(Post);
    res.json(Post);
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  const { TableNumber, indoor, SeatCapacity, VIP, Note } = req.body;
  const { id } = req.params;
  const updatedTable = { TableNumber, indoor, SeatCapacity, VIP, Note };

  try {
    const tablemanage = await TableManagementSystem.findByPk(id);

    if (!tablemanage) {
      res.status(404).json({ error: "Table not found" });
      return;
    }
    await tablemanage.update(updatedTable);

    res.json(updatedTable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
