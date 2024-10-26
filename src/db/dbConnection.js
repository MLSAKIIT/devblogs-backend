import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Blogs from "../models/Blogs.js";

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("> DB connected Successfully!")

    } catch (err) {
        console.log("> Error connecting to DB:");
        console.error(err);
        process.exit(1);
    }

}

export default connectDatabase;