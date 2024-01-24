const express = require("express");
const router = express.Router();
const unidadController = require("../controller/unidadController");
const middleware = require("../middleware/jwt-middleware");

router.get("/unidades", middleware, unidadController.getUnidades);
router.get("/unidad/:id", middleware, unidadController.getUnidad);
router.post("/unidad/add", middleware, unidadController.addUnidad);

module.exports = router;
