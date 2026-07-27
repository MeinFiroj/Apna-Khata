import express from 'express'
import { userEmailCheck, userLogCtrl, userRegCtrl } from '../controllers/userAuth.controllers.js';

const userRouter = express.Router();

userRouter.post('/check-email', userEmailCheck)
userRouter.post('/register', userRegCtrl)
userRouter.post('/login', userLogCtrl)





export default userRouter;