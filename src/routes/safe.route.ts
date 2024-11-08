import { Router } from "express";
import {
  createSafe,
  deleteSafe,
  getSafe,
  getSafes,
  updatePassword,
  updateSafe,
} from "../controllers/safe.controller";

const router = Router();

router.route("/").post(createSafe).get(getSafes);
router.patch("/update-password", updatePassword);
router.route("/:id").get(getSafe).patch(updateSafe).delete(deleteSafe);

export default router;
