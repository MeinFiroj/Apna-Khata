import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.routes.js';
import adminRouter from './routes/admin.routes.js';
import userRouter from './routes/user.routes.js';

const app = express()

// Middlewares
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))


// Routes
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)


export default app;
