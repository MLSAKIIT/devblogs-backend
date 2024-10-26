import mongoose from "mongoose";
import "dotenv/config";

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