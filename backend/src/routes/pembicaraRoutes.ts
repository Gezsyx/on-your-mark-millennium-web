import { Router } from "express";
import {
    getPembicara,
savePembicara,
showPembicaraById,
updatePembicaraById,
deletePembicaraById,
} from "../controllers/pembicaraController.js";

const router = Router();

router.get("/", getPembicara);
router.get("/:id", showPembicaraById);
router.post("/", savePembicara);
router.put("/:id", updatePembicaraById);
router.delete("/:id", deletePembicaraById);

export default router;
