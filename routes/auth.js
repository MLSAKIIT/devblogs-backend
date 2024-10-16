import express from "express";

import { loginHandler, registerHandler } from '../controllers/auth.js';

const router = express.Router();

router.post("/login", (req, res) => {
  loginHandler(req, res);
});

router.post("/register", (req, res) => {
  registerHandler(req, res);
});

export default router;