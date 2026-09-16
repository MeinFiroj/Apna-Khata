import express from 'express'
import multer, { memoryStorage } from 'multer';
import { isAdmin, setRole, validateAdminCred, verifyToken } from '../middlewares/auth.middleware.js';
import { adminLoginCtrl, adminLogoutCtrl, adminMeCtrl, adminRegCtrl } from '../controllers/adminAuth.controller.js';
import { createUser, deActivateUser, getLedger, getUsers, overdueCustomers, reActivateUser, searchUser } from '../controllers/admin.controller.js';
import { forgotPassword, resetPassword } from '../controllers/resetPass.controller.js';
import { getDashboardTotals, getTotals } from '../controllers/entry.controller.js';
import { entryModel } from '../models/entry.model.js';
import { userModel } from '../models/user.model.js';

const adminRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() })

// Auth routes
adminRouter.post('/register', validateAdminCred, adminRegCtrl)
adminRouter.post('/login', validateAdminCred, adminLoginCtrl)
adminRouter.get("/me", verifyToken, isAdmin, adminMeCtrl)
adminRouter.post("/logout", verifyToken, isAdmin, adminLogoutCtrl)
adminRouter.get('/dashboard-totals', verifyToken, isAdmin, getDashboardTotals)

adminRouter.post('/forgot-password', setRole('admin'), forgotPassword)
adminRouter.post('/reset-password/:token', setRole('admin'), resetPassword)

// User Account management routes
adminRouter.post('/create-user', upload.single('image'), verifyToken, isAdmin, createUser)
adminRouter.patch('/deactivate-user/:id', verifyToken, isAdmin, deActivateUser)
adminRouter.patch('/reactivate-user/:id', verifyToken, isAdmin, reActivateUser)
adminRouter.get('/overdue', verifyToken, isAdmin, overdueCustomers)

adminRouter.get('/users/:custId/ledger', verifyToken, isAdmin, getLedger)
adminRouter.get('/users', verifyToken, isAdmin, getUsers)
adminRouter.get('/search-user', verifyToken, isAdmin, searchUser)


export default adminRouter;