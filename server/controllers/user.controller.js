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