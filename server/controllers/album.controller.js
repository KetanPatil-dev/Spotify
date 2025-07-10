import AlbumModel from "../models/album.model.js"

export const getAllAlbums=async(req,res)=>{
    try {
        const album= await AlbumModel.find()
        if(!album)
        {
            return res.status(400).json({message:"No albums found"})
        }
        return res.status(200).json(album)
        
    } catch (error) {
        console.log("Get Albums Error",error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}
export const getAlbumsById=async(req ,res)=>{
    try {
        const {albumId}=req.params
        const album=await AlbumModel.findById(albumId).populate("songs")
        if(!album)
        {
            return res.status(400).json({message:"No album found"})
        }
        return res.status(200).json(album)
        
    } catch (error) {
        console.log("Get AlbumsById Error",error)
        return res.status(500).json({message:"Internal Server Error"})
        
    }
}