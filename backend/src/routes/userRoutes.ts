import { Router } from "express";
import { deleteUserById, getUser,
    saveUser,
    showUserById,
    updateUserById,
} from "../controllers/userController.js";


const router = Router();

router.get("/", getUser);
router.get("/:id", showUserById);
router.post("/", saveUser)
router.put("/:id", updateUserById)
router.delete("/id", deleteUserById)


export default router;
