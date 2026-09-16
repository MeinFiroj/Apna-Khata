import app from "./src/app.js";
import { config } from "dotenv";
import connectDb from "./src/db.js";
config()


const PORT = process.env.PORT;


const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});





