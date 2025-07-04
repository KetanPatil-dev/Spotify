import { clerkClient } from "@clerk/express";
export const protectRoute=async(req,res,next)=>{
    if(!req.auth.userId)
    {
            res.status(401).json({message:"Unauthorized"})
    return
    }
    next();
}

export const requireAdmin=async(req,res,next)=>{
    try {
    const currentUser= await clerkClient.users.getUser(req.auth.userId)
    const isAdmin=process.env.ADMIN_EMAIL===currentUser.primaryEmailAddress.emailAddress
    if(!isAdmin)
    {
       res.status(403).json({message:"Unauthorized- you must be an ADMIN"}) 
       return;
    }
    next()
        
    } catch (error) {
        
    }
}