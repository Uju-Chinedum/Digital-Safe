import { Router } from "express";
import {
  deleteMe,
  getMe,
  updateMe,
  updatePassword,
} from "../controllers/user.controller";

const router = Router();

router.get("/get-me", getMe);
router.patch("/update-me", updateMe);
router.patch("/update-password", updatePassword);
router.delete("/delete-me", deleteMe);

export default router;
