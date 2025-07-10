import express from "express"
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js"
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/admin.controller.js"

const AdminRoutes=express.Router()

AdminRoutes.post("/songs",protectRoute,requireAdmin,createSong)
AdminRoutes.delete("/songs/:id",protectRoute,requireAdmin,deleteSong)
AdminRoutes.post("/albums",protectRoute,requireAdmin,createAlbum)
AdminRoutes.delete("/albums/:id",protectRoute,requireAdmin,deleteAlbum)
AdminRoutes.get("/check",protectRoute,requireAdmin,checkAdmin)
export default AdminRoutes