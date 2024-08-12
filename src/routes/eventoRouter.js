import { Router } from "express";
import { postPalestrante, getPalestrante } from "../controllers/eventoController.js";



const router = Router();
router.post("/palestrantes", postPalestrante);
router.get("/palestrantes", getPalestrante)

export default router;
