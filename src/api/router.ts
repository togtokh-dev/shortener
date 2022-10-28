import { Router } from "express";
const router = Router();
import {
  create,
  getinfo,
  getone,
  getone_sum,
  qrCreate,
  qrCreate_text,
} from "./controller";
router.post("/", create);
router.get("/:id", getone);
router.get("/:id/sum", getone_sum);
router.get("/:id/info", getinfo);
router.post("/qr", qrCreate_text);
router.get("/qr/create", qrCreate);

export default router;
