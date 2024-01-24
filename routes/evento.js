const express = require("express");
const router = express.Router();
const eventoController = require("../controller/eventoController");
const middleware = require("../middleware/jwt-middleware");

router.get("/eventos", middleware, eventoController.getEventos);
router.get("/evento/:id", middleware, eventoController.getEvento);
router.post("/evento/add", middleware, eventoController.addEvento);

module.exports = router;
