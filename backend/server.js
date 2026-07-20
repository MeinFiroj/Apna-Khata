import app from "./src/app.js";
import { config } from "dotenv";
import connectDb from "./src/db.js";
config()


const PORT = process.env.PORT;


connectDb()
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})






