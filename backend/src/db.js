import mongoose from "mongoose";
import dns from "node:dns/promises";

const connectDb = async () => {
    dns.setServers(["1.1.1.1", "8.8.8.8"]); // without this db is throwing ECONNREFUSED error.

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully!")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;