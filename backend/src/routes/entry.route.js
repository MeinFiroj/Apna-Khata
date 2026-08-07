import express from 'express';
import { checkActive, checkActiveForEntry, isAdmin, isUser, verifyToken } from '../middlewares/auth.middleware.js';
import { addEntry, getAllEntries, getPendingEntries, getRejectedEntries, getSingleCustEntries, getVerifiedEntries, rejectEntry, verifyEntry } from '../controllers/entry.controller.js';

const entryRouter = express.Router();

entryRouter.post('/:customerId', verifyToken, isAdmin, checkActive, addEntry);
entryRouter.get('/all', verifyToken, isAdmin, getAllEntries);
entryRouter.get('/pendings', verifyToken, isAdmin, getPendingEntries);
entryRouter.get('/rejected', verifyToken, isAdmin, getRejectedEntries);
entryRouter.get('/verified', verifyToken, isAdmin, getVerifiedEntries);
entryRouter.get('/:customerId', verifyToken, isAdmin, getSingleCustEntries);
entryRouter.patch('/:id/verify', verifyToken, isAdmin, checkActiveForEntry, verifyEntry);
entryRouter.patch('/:id/reject', verifyToken, isAdmin, checkActiveForEntry, rejectEntry);

entryRouter.post('/', verifyToken, isUser, checkActive, addEntry);
entryRouter.get('/', verifyToken, isUser, getSingleCustEntries)

export default entryRouter;