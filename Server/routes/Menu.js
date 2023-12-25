const express = require("express");
const router = express.Router();
const { Menu } = require("../models");

router.get("/", async (req, res) => {
  const menu = await Menu.findAll();
  res.json(menu);
});
router.get("/food", async (req, res) => {
  const menu = await Menu.findAll({
    where:{
      categorie:"food"
    }
  });
  res.json(menu);
});
router.get("/beaverage", async (req, res) => {
  const menu = await Menu.findAll({
    where:{
      categorie:"Beaverage"
    }
  });
  res.json(menu);
});

router.post("/", async (req, res) => {
  const Post = req.body;
  await Menu.create(Post);
  res.json(Post);
});
// router.get("/beaverage", async (req, res) => {
//   const beaverage = await Beaverage.findAll();
//   res.json(beaverage);
// });

// router.post("/beavarege", async (req, res) => {
//   const Posts = req.body;
//   await Beaverage.create(Posts);
//   res.json(Posts);
// });
module.exports = router;
