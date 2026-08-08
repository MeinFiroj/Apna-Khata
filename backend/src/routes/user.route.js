import express from 'express'
import { userEmailCheck, userLogCtrl, userMeCtrl, userRegCtrl } from '../controllers/userAuth.controller.js';
import { forgotPassword, resetPassword } from '../controllers/resetPass.controller.js';
import { setRole } from '../middlewares/auth.middleware.js';
import multer from 'multer';

const userRouter = express.Router();

const upload = multer({storage : multer.memoryStorage()})

userRouter.post('/check-email', userEmailCheck)
userRouter.post('/register',upload.single('image'), userRegCtrl)
userRouter.post('/login', userLogCtrl)
userRouter.get('/me', userMeCtrl)

userRouter.post('/forgot-password', setRole('user'), forgotPassword)
userRouter.post('/reset-password/:token', setRole('user'), resetPassword)

export default userRouter;