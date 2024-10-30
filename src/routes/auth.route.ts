import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import validateUser from "../validation/user.validation";
import authenticateUser from "../middleware/authentication";

const router = Router();

router.post("/register", validateUser, register);
router.post("/login", login);
router.post("/logout", authenticateUser, logout);

export default router;
