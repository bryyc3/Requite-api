
import { Router } from "express";
import { login, signUp, logout } from "../controllers/authController.js";

const router = Router();

router.post('/login', login);
router.post('/sign-up', signUp);
router.post('/logout', logout);

export default router;