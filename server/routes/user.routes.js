import express from "express"

const UserRoutes=express.Router()

UserRoutes.get("/like",(req,res)=>{
    req.auth.userId
    res.send("user route get")
})