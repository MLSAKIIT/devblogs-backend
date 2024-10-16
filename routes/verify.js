import express from 'express';
import { verifyTokenHandler } from '../controllers/auth.js';

export const router = express.Router();

router.post("/verify", verifyTokenHandler);