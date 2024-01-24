const express = require("express");
const router = express.Router();
const unidadController = require("../controller/unidadController");
const middleware = require("../middleware/jwt-middleware");

router.get("/unidades", middleware, unidadController.getUnidades);
router.get("/unidad/:idGps", middleware, unidadController.getUnidad); // Use the same parameter name
router.post("/unidad/add", middleware, unidadController.addUnidad);

module.exports = router;
