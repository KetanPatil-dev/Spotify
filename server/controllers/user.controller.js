import UserModel from "../models/user.model.js"

export const authCallback=async(req ,res)=>{
    try{
        const {id,firstName,lastName,imageUrl}=req.body
        const user= await UserModel.findOne({clerkId:id})
        if(!user)
            {
                await UserModel.create({
                    clerkId:id,
                    fullName:`${firstName} ${lastName}`,
                    imageUrl,

                })
            }
            return res.status(201).json({success:true})

    } catch(error)
    {
        console.log("AuthCallback Error",error)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const getAllUsers=async(req ,res)=>{
    try {
        const currentUserId= req.auth.currentUserId
        const users= await UserModel.find({clerkId:{$ne:currentUserId}});
        return res.json(users)
    } catch (error) {
        console.log("GetAll Users",error)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}