import express from 'express';
import indexController from "../controllers/index.js"

const router = express.Router();

router.get("/", indexController.inicio);

router.get("/viajes", indexController.viajes);

router.get("/viajes/:slug", indexController.detalleViaje)

router.get("/testimoniales", indexController.testimoniales);
router.post("/testimoniales", indexController.guardartestimonial);

router.get("/nosotros", indexController.nosotros);

export default router;