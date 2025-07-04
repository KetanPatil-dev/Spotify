import mongoose from "mongoose";

const ConnectDB=async ()=>{

    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB Connected Successfully")
}

export default ConnectDB