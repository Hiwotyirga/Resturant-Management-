const express = require("express");
const router = express.Router();
const { Menu } = require("../models");

router.get("/", async (req, res) => {
  const menu = await Menu.findAll();
  res.json(menu);
});
router.get("/food", async (req, res) => {
  const menu = await Menu.findAll({
    where: {
      categorie: "Food",
    },
  });
  res.json(menu);
});
router.get("/beaverage", async (req, res) => {
  const menu = await Menu.findAll({
    where: {
      categorie: "Beaverage",
    },
  });
  res.json(menu);
});

router.post("/", async (req, res) => {
  const Post = req.body;
  await Menu.create(Post);
  res.json(Post);
});
router.put("/update/:id", async (req, res) => {
  const { categorie, Ingredients, Group, name, postrer, price } = req.body;
  const { id } = req.params;
  const Posts = { categorie, Ingredients, Group, name, postrer, price };
  try {
    const updatemenu = await Menu.findByPk(id);
    if (updatemenu) {
      await Menu.update(Posts, {
        where: {
          id: id,
        },
      });
      res.json(Posts);
    } else {
      res.status(404).json({ error: "Menu item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const menuToDelete = await Menu.findByPk(id);

    if (menuToDelete) {
      await menuToDelete.destroy();
      res.json({ message: "Menu item deleted successfully" });
    } else {
      res.status(404).json({ error: "Menu item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/priceUpdate/:id", async (req, res) => {
  const { price } = req.body;
  const { id } = req.params;

  try {
    const menuToUpdate = await Menu.findByPk(id);

    if (!menuToUpdate) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    menuToUpdate.price = price;
    await menuToUpdate.save();

    res.json(menuToUpdate);
  } catch (error) {
    console.error("Error updating price:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
