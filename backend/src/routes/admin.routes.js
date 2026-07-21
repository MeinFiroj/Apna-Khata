import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminRegController } from '../controllers/auth.controllers.js';

const adminRouter = express.Router();

adminRouter.post('/register', authMiddleware, adminRegController)

export default adminRouter;