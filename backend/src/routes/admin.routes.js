import express from 'express'
import { authMiddleware, isAdmin, verifyToken } from '../middlewares/auth.middleware.js';
import { adminLoginCtrl, adminMeCtrl, adminRegCtrl, createUserCtrl, deActivateUser, reActivateUser } from '../controllers/adminAuth.controllers.js';
import { userModel } from '../models/user.model.js';

const adminRouter = express.Router();

// Auth routes
adminRouter.post('/register', authMiddleware, adminRegCtrl)
adminRouter.post('/login', authMiddleware, adminLoginCtrl)
adminRouter.get("/me", adminMeCtrl)

// User Account management routes
adminRouter.post('/create-user', verifyToken, isAdmin, createUserCtrl)
adminRouter.post('/deactivate-user/:id', verifyToken, isAdmin, deActivateUser)
adminRouter.post('/reactivate-user/:id', verifyToken, isAdmin, reActivateUser)



export default adminRouter;