import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Connected to Database Successfully!");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/invoase`);
}

export default connectDB;
