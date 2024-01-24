const express = require("express");
const router = express.Router();
const eventoController = require("../controller/eventoController");
const middleware = require("../middleware/jwt-middleware");

router.get("/eventos", middleware, eventoController.getEventos);
router.get("/evento/:idEvento", middleware, eventoController.getEvento);
router.get(
  "/eventos/:dtini/:dtfin/:idGps",
  eventoController.getEventosByDateAndIdGps
);
router.post("/evento/add", middleware, eventoController.addEvento);

module.exports = router;
