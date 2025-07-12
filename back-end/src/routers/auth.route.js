import express from "express"
const router = express.Router();
import { login, signup, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";

router.post("/signup", signup)
router.get("/", (req,res)=>{
    res.json({data:"hh"})
})
router.post("/login", login)
router.post("/logout", logout)
router.put("/update-profile", protectRoute, updateProfile)
router.get("/check", protectRoute, checkAuth)





export default router