const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

const unidadController = {
  getUnidades: async (req, res) => {
    const sql = `SELECT * FROM Unidad`;
    try {
      const result = await connection.query(sql);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getUnidad: async (req, res) => {
    const id = req.query;
    const sql = `SELECT * FROM Unidad WHERE idUnidad = ?`;
    try {
      const result = await connection.query(sql, [id]);
      if (result.length === 0) {
        res.status(404).json({ message: "Unit not found" });
      } else {
        res.json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  addUnidad: async (req, res) => {
    const sql = `INSERT INTO Unidad (marca, modelo, placas, serie, ano, color, linea) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const { marca, modelo, placas, serie, ano, color, linea } = req.body;
    try {
      const result = await connection.query(sql, [
        marca,
        modelo,
        placas,
        serie,
        ano,
        color,
        linea,
      ]);
      res.json(result);
    } catch (error) {
      console.error(error);
      if (error.code === "ER_DUP_ENTRY") {
        res
          .status(400)
          .json({ message: "Duplicate entry. The unit already exists." });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },
};

module.exports = unidadController;
