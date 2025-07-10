import express from "express"
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js"
import { AllInfo } from "../controllers/stats.controller.js"

const StatsRoutes=express.Router()
StatsRoutes.get("/",protectRoute,requireAdmin,AllInfo)
export default StatsRoutes