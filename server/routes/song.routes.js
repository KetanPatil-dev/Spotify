import express from "express"
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js"
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, gettrendingSongs } from "../controllers/song.controller.js"
const SongRoutes= express.Router()

SongRoutes.get("/",protectRoute,requireAdmin,getAllSongs)
SongRoutes.get("/featured",getFeaturedSongs)
SongRoutes.get("/made-for-you",getMadeForYouSongs)
SongRoutes.get("/trending",gettrendingSongs)

export default SongRoutes