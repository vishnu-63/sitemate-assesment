import mongoose from 'mongoose';
const url = 'mongodb://localhost:27017/issues';


const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;