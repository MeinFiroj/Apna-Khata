import express from 'express'
import { authMiddleware, isAdmin } from '../middlewares/admin.middleware.js';
import { adminLoginCtrl, adminMeCtrl, adminRegCtrl, createUserCtrl } from '../controllers/adminAuth.controllers.js';

const adminRouter = express.Router();

// Auth routes
adminRouter.post('/register', authMiddleware, adminRegCtrl)
adminRouter.post('/login', authMiddleware, adminLoginCtrl)
adminRouter.get("/me", adminMeCtrl)

// User Account management routes
adminRouter.post('/create-user', isAdmin, createUserCtrl)

export default adminRouter;