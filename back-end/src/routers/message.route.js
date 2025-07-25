import express from "express"
const router = express.Router();
import { getUsersForSidebar, getMessage, sendMessage } from "../controllers/message.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";

router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessage)
router.post("/send/:id", protectRoute, sendMessage)





export default router