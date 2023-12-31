import express from 'express';
import { register, login } from '../controllers/auth.js';

const router = express.Router();


// POST
router.post('/register', register);
router.post('/login', login);

// GET


export default router;