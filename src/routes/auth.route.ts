import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import validateUser from "../validation/user.validation";

const router = Router();

router.post("/register", validateUser, register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
