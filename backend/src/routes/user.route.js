import express from 'express'
import { userEmailCheck, userLogCtrl, userMeCtrl, userRegCtrl } from '../controllers/userAuth.controller.js';

const userRouter = express.Router();

userRouter.post('/check-email', userEmailCheck)
userRouter.post('/register', userRegCtrl)
userRouter.post('/login', userLogCtrl)
userRouter.get('/me', userMeCtrl)


export default userRouter;