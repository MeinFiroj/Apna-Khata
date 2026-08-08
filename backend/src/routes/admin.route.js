import express from 'express'
import multer, { memoryStorage } from 'multer';
import { isAdmin, setRole, validateAdminCred, verifyToken } from '../middlewares/auth.middleware.js';
import { adminLoginCtrl, adminMeCtrl, adminRegCtrl } from '../controllers/adminAuth.controller.js';
import { createUser, deActivateUser, getLedger, reActivateUser, searchUser } from '../controllers/user.controller.js';
import { forgotPassword, resetPassword } from '../controllers/resetPass.controller.js';

const adminRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() })

// Auth routes
adminRouter.post('/register', validateAdminCred, adminRegCtrl)
adminRouter.post('/login', validateAdminCred, adminLoginCtrl)
adminRouter.get("/me", verifyToken, isAdmin, adminMeCtrl)

adminRouter.post('/forgot-password', setRole('admin'), forgotPassword)
adminRouter.post('/reset-password/:token', setRole('admin'), resetPassword)

// User Account management routes
adminRouter.post('/create-user', upload.single('image'), verifyToken, isAdmin, createUser)
adminRouter.patch('/deactivate-user/:id', verifyToken, isAdmin, deActivateUser)
adminRouter.patch('/reactivate-user/:id', verifyToken, isAdmin, reActivateUser)

adminRouter.get('/customers/:custId/ledger', verifyToken, isAdmin, getLedger)
adminRouter.get('/search-user', verifyToken, isAdmin, searchUser)


export default adminRouter;