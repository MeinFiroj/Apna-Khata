import express from 'express'
import cors from 'cors'
import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser'
import entryRouter from './routes/entry.route.js';

const app = express()

// Middlewares
app.use(express.json());
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(cookieParser())


// Routes
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/entries', entryRouter)


export default app;
