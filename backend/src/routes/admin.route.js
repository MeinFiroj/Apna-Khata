import express from 'express'
import { authMiddleware, isAdmin, verifyToken } from '../middlewares/auth.middleware.js';
import { adminLoginCtrl, adminMeCtrl, adminRegCtrl } from '../controllers/adminAuth.controller.js';
import { createUser, deActivateUser, getLedger, reActivateUser, searchUser } from '../controllers/user.controller.js';

const adminRouter = express.Router();

// Auth routes
adminRouter.post('/register', authMiddleware, adminRegCtrl)
adminRouter.post('/login', authMiddleware, adminLoginCtrl)
adminRouter.get("/me", adminMeCtrl)

// User Account management routes
adminRouter.post('/create-user', verifyToken, isAdmin, createUser)
adminRouter.patch('/deactivate-user/:id', verifyToken, isAdmin, deActivateUser)
adminRouter.patch('/reactivate-user/:id', verifyToken, isAdmin, reActivateUser)

adminRouter.get('/customers/:custId/ledger', verifyToken, isAdmin, getLedger)
adminRouter.get('/search-user', verifyToken, isAdmin, searchUser)


export default adminRouter;