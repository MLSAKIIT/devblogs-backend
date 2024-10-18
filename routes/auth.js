import express from "express";
import { validateRequest, registerSchema } from '../validators/register.js';
import { loginSchema } from "../validators/login.js";
import { loginHandler, registerHandler, changePasswordHandler } from '../controllers/auth.js';
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

const router = express.Router();

router.post("/login", validateRequest(loginSchema), (req, res) => {
  loginHandler(req, res);
});

router.post("/register", validateRequest(registerSchema), (req, res) => {
  registerHandler(req, res);
});

router.put("/change-password", verifyTokenMiddleware , changePasswordHandler);


export default router;