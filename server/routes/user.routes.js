import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { getAllUsers } from "../controllers/user.controller.js"

const UserRoutes=express.Router()

UserRoutes.get("/",protectRoute,getAllUsers)

export default UserRoutes