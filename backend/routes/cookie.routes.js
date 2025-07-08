import { Router } from "express";
import { checkCookie } from "../controller/cookie.controller.js";

const router = Router();

router.get("/check", checkCookie);

export default router;
