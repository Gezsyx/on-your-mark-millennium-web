import { Router } from "express";
import {
getCategory,
saveCategory,
showCategoryById,
updateCategoryById,
deleteCategoryById,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", getCategory);
router.get("/:id", showCategoryById);
router.post("/", saveCategory);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);

export default router;
