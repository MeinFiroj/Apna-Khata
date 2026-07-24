import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminLoginCtrl, adminMeCtrl, adminRegCtrl } from '../controllers/auth.controllers.js';

const adminRouter = express.Router();

adminRouter.post('/register', authMiddleware, adminRegCtrl)
adminRouter.post('/login', authMiddleware, adminLoginCtrl)
adminRouter.get("/me", adminMeCtrl)

export default adminRouter;