import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectToDB() {
    try {
        
        const connect = await mongoose.connect(process.env.MONGODB_URI);
    
        console.log(`MongoDB Connected: ${connect.connection.host}`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
      }
}

export default connectToDB;
