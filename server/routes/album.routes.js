import express from "express"
import { getAlbumsById, getAllAlbums } from "../controllers/album.controller.js"
const AlbumRoutes=express.Router()

AlbumRoutes.get("/",getAllAlbums)
AlbumRoutes.get("/:albumId",getAlbumsById)
export default AlbumRoutes