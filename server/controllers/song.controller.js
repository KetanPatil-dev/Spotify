import { title } from "process"
import SongModel from "../models/song.model.js"

export const getAllSongs=async(req ,res)=>{
    try {
        const songs= await SongModel.find().sort({createdAt:-1}) //latest song on top
        if(!songs)
        {
            return res.status(400).json({message:"Songs not found"})
        }
        return res.status(200).json(songs)
        
        
    } catch (error) {
        console.log("GetAllSongs error",error)
        
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const getFeaturedSongs=async(req ,res)=>{
    try{
        const songs=await SongModel.aggregate([
        {
            $sample:{size:6}
        },
        {$project:{
            _id:1,
            title:1,
            artist:1,
            imageUrl:1,
            audioUrl:1
        }}
    ])
    return res.json(songs)


    } catch(error)
    {
        console.log("GetFeaturedSongs Error",error)
        return res.status(500).json({messsage:"Internal Server Error"})
    }
}

export const getMadeForYouSongs=async(req ,res)=>{
    try {
        const madeForYou= await SongModel.aggregate([
            {$sample:{size:4}},
            {$project:{title:1,artist:1,audioUrl:1,imageUrl:1,_id:1}}
        ])
        return res.json(madeForYou)
        
    } catch (error) {
        console.log("GetMadeForYou Error",error)
        return res.status(500).json({messsage:"Internal Server Error"})
        
    }

}
export const gettrendingSongs=async(req,res)=>{
    try {
        const trending= await SongModel.aggregate([{
            $sample:{size:4}},
            {$project:{_id:1,artist:1,audioUrl:1,imageUrl:1,title:1}}
        ])
        
    } catch (error) {
        console.log("GetTrendingSongs Error",error)
        return res.status(500).json({messsage:"Internal Server Error"})
    }

}