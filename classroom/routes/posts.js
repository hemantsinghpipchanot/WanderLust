const express = require("express");
const router=express.Router();
//INDEX-posts
router.get("/",(req,res)=>{
    res.send("Get  for posts data");
});
//Show-posts
router.get("/:id",(req,res)=>{
    res.send("Get for post id");
});
//post-posts
router.post("/",(req,res)=>{
    res.send("post for posts");
});
//Delete-posts
router.delete("/:id",(req,res)=>{
   res.send("Delete for post  id");
});
module.exports=router;