import { Router } from "express";
import {
  createSafe,
  deleteSafe,
  getSafe,
  getSafes,
  updatePassword,
  updateSafe,
} from "../controllers/safe.controller";
import validateSafe from "../validation/safe.validation";

const router = Router();

router.route("/").post(validateSafe, createSafe).get(getSafes);
router.patch("/update-password", updatePassword);
router.route("/:id").get(getSafe).patch(updateSafe).delete(deleteSafe);

export default router;
