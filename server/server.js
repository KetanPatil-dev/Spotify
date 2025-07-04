import express from "express"
import dotenv from "dotenv"
import {clerkMiddleware} from "@clerk/express"
import ConnectDB from "./lib/connect.js"
import AuthRoutes from "./routes/auth.routes.js"
dotenv.config()

const app=express()
const PORT=process.env.PORT || 9001
app.use(clerkMiddleware())

const Start=async()=>{
    try {
        await ConnectDB()
        app.listen(PORT,()=>console.log(`Server Started on PORT:${PORT}`))
        app.use("/api/auth",AuthRoutes)

    } catch (error) {
        console.log("Start Error",error)
    }

}
Start()