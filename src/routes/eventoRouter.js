import { Router } from "express";
import { postPalestrante, getPalestrante, criarEvento ,getAgenda, registroParticipante, getParticipantes, inscreverParticipante, getInscricoes} from "../controllers/eventoController.js";



const router = Router();
router.post("/palestrantes", postPalestrante);
router.get("/palestrantes", getPalestrante);
router.post("/criar", criarEvento)
router.get("/agenda", getAgenda)
router.post("/participantes/registrar", registroParticipante)
router.get("/participantes", getParticipantes)
router.get("/inscricoes", getInscricoes)
router.post("/inscrever", inscreverParticipante)

export default router;
