import express from "express";
import { validateRequest, registerSchema } from '../validators/register.js';
import { loginHandler, registerHandler } from '../controllers/auth.js';

const router = express.Router();

router.post("/login", (req, res) => {
  loginHandler(req, res);
});

router.post("/register", validateRequest(registerSchema), (req, res) => {
  registerHandler(req, res);
});

export default router;