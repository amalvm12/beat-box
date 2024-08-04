import mongoose from "mongoose";

const connectDB = async ()=>{

    mongoose.connection.on("connected", ()=>{
        console.log("MongoDb Connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/beatbox`);
}

export default connectDB