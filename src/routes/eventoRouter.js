import { Router } from "express";
import { postPalestrante, getPalestrante, criarEvento ,getAgenda, registroParticipante, getParticipantes, inscreverParticipante, getInscricoes, postFeedback, getMostPopular, getMaisAtivo, editEvento, deletarProduto, getEventosInscritos} from "../controllers/eventoController.js";



const router = Router();
router.post("/palestrantes", postPalestrante); //ok
router.get("/palestrantes", getPalestrante); //ok
router.post("/criar", criarEvento) //ok
router.get("/agenda", getAgenda) //ok

router.post("/participantes/registrar", registroParticipante) //ok
router.get("/participantes", getParticipantes) //ok
router.get("/inscricoes", getInscricoes) //ok
router.post("/inscrever", inscreverParticipante) //ok
router.post("/feedback", postFeedback) //ok
router.get("/mais-popular", getMostPopular) //ok
router.get("/palestrante-mais-ativo", getMaisAtivo) //ok
router.put("/editar", editEvento) //ok
router.delete("/cancelar", deletarProduto) //ok
router.get("/meus-eventos/:participanteId", getEventosInscritos) //ok


export default router;
