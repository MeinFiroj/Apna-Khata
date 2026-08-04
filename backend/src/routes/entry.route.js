import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/auth.middleware.js';
import { addEntry, getAllEntries, getPendingEntries, getSingleCustEntries, rejectEntry, verifyEntry } from '../controllers/entry.controller.js';

const entryRouter = express.Router()

entryRouter.post('/:customerId', verifyToken, isAdmin, addEntry)
entryRouter.get('/', verifyToken, isAdmin, getAllEntries)
entryRouter.get('/pendings', verifyToken, isAdmin, getPendingEntries)
entryRouter.get('/:customerId', verifyToken, isAdmin, getSingleCustEntries)
entryRouter.patch('/:id/verify', verifyToken, isAdmin, verifyEntry)
entryRouter.patch('/:id/reject', verifyToken, isAdmin, rejectEntry)


export default entryRouter;