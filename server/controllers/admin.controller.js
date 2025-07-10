import AlbumModel from "../models/album.model.js";
import SongModel from "../models/song.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return res.secure_url;
  } catch (error) {
    console.log("uploadToCloudinary error", error);
  }
};
export const createSong = async (req, res) => {
  try {
    if (!req.files || !req.file.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all the files" });
    }

    const { title, artist, ablumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new SongModel({
      title,
      artist,
      audioUrl,
      ablumId: ablumId || null,
      duration,
      imageUrl,
    });
    await song.save();
    if (ablumId) {
      await AlbumModel.findByIdAndUpdate(
        ablumId,
        { $push: { songs: song_id } },
        { new: true }
      );
    }

    return res.status(201).json(song);
  } catch (error) {
    console.log("Create Song error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSong=async(req ,res)=>{
    try{

        const {id}=req.params
        const song=await SongModel.findById(id)
        if(!song)
            {
             res.status(400).json({message:"Song not found"})
             return
            }
            if(song.albumId)
            {
                await AlbumModel.findByIdAndUpdate(song.albumId,{$pull:{songs:song._id}},{new:true})
            }
            await SongModel.findByIdAndDelete(id)

    } catch(error)
    {
        console.log("Delete Song error",error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createAlbum=async(req ,res)=>{
    try {
       const {title,releaseYear,artist} =req.body
       const imageFile=req.files
       const imageUrl= await uploadToCloudinary(imageFile)

       const album= new AlbumModel({
        title,artist,releaseYear,imageUrl
       })
       await album.save()
       return res.status(201).json(album)
        
    } catch (error) {
        console.log("Create Album Error",error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteAlbum=async(req,res)=>{
    try {
        const {id}=req.params
    await SongModel.deleteMany({albumId:id})
 await AlbumModel.findByIdAndDelete(id)
 return res.status(200).json({message:"Album deleted Successfully"})
        
    } catch (error) {
        console.log("Delete Album Error",error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAdmin =async(req ,res)=>{
 return res.status(200).json({admin:true})
}