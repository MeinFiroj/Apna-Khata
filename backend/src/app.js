import express from 'express'
import cors from 'cors'
import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser'
import entryRouter from './routes/entry.route.js';

const app = express()

// Middlewares
app.use(cors({
    origin : [process.env.FRONTEND_URL, process.env.FRONTEND_URL_ADMIN , 'http://localhost:5173'],
    credentials : true
}))
console.log("RAW FRONTEND_URL:", JSON.stringify(process.env.FRONTEND_URL));
console.log("RAW FRONTEND_URL_ADMIN:", JSON.stringify(process.env.FRONTEND_URL_ADMIN));
app.use(cookieParser())
app.use(express.json());


// Routes
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/entries', entryRouter)


export default app;
