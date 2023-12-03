const express = require("express");
const router = express.Router();
const {validateToken}=require("../middlewares/Authmiddleware")

const { Reservation } = require("../models");


router.get("/", async (req, res) => {
  const postAll = await Reservation.findAll();
  res.json(postAll);
});

router.post("/",  async (req, res) => {
const post =req.body;
await Reservation.create(post)       
res.json(post)
    
  });
  router.put("/update",  async (req, res) => {
    const {newreservation,id}=req.body;
    await Reservation.update({update:newreservation},{where :{id:id}})
    res.json(newreservation)
        
      });
  router.delete("/:postId",async(req,res)=>{
    const postId=req.params.postId
    await Reservation.destroy({
      where:{
        id:postId
      }
    })
res.json("Delete sucessfully")

  })

module.exports = router;
 