const express = require("express");
const router=express.Router();
//INDEX-users
router.get("/",(req,res)=>{
    res.send("Get  for users data");
});
//Show-users
router.get("/:id",(req,res)=>{
    res.send("Get for user id");
});
//post users
router.post("/",(req,res)=>{
    res.send("post for users");
});
//Delete-users
router.delete("/:id",(req,res)=>{
   res.send("Delete for user  id");
});
module.exports=router;