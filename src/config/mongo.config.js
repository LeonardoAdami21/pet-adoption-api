import mongoose from "mongoose";
import { MONGODB_URI } from "../env/envoriment.js";

export const connectMongo = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            connectTimeoutMS: 10000,
            timeoutMS: 10000
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};