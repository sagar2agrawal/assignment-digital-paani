import mongoose from "mongoose";

const connectDB = async (URI) => { 
    return await mongoose.connect(URI, {
        
    });
}

export default connectDB;