const express = require("express");
const router = express.Router();

const { TableManagementSystem } = require("../models");
router.get("/",async(req,res)=>{
    const table= await TableManagementSystem.findAll()
    res.json(table)

})

router.post("/", async (req, res) => {
  const { TableNumber, indoor, SeatCapacity, VIP, Note } = req.body;
  const Post = { TableNumber, indoor, SeatCapacity, VIP, Note };
  try {
    await TableManagementSystem.create(Post);
    res.json(Post);
  } catch (error) {
    res.json("error");
  } 
});
module.exports = router;
