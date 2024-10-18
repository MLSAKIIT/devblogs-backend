import express from "express";
import { validateRequest, registerSchema } from '../validators/register.js';
import { loginHandler, registerHandler, changePasswordHandler } from '../controllers/auth.js';
import { verifyTokenMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginHandler);


router.post("/register", validateRequest(registerSchema), (req, res) => {
  registerHandler(req, res);
});

router.put("/change-password", verifyTokenMiddleware , changePasswordHandler);


export default router;