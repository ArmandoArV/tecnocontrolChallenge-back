const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

const eventoController = {
  getEventos: async (req, res) => {
    const sql = `SELECT * FROM Evento`;
    try {
      const result = await connection.query(sql);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getEvento: async (req, res) => {
    const id = req.query;
    const sql = `SELECT * FROM Evento WHERE idEvento = ?`;
    try {
      const result = await connection.query(sql, [id]);
      if (result.length === 0) {
        res.status(404).json({ message: "Event not found" });
      } else {
        res.json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  addEvento: async (req, res) => {
    const sql = `INSERT INTO Evento (name_device, date_message, idMessage, dsc_Message, latitud, longitud, velocidad, ignicion, odometro_kms, dir) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    try {
      const {
        name_device,
        date_message,
        idMessage,
        dsc_Message,
        latitud,
        longitud,
        velocidad,
        ignicion,
        odometro_kms,
        dir,
      } = req.body;
      const result = await connection.query(sql, [
        name_device,
        date_message,
        idMessage,
        dsc_Message,
        latitud,
        longitud,
        velocidad,
        ignicion,
        odometro_kms,
        dir,
      ]);
      res.json(result);
    } catch (error) {
      console.error(error);
      if (error.code === "ER_DUP_ENTRY") {
        res
          .status(400)
          .json({ message: "Duplicate entry. The event already exists." });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },
};

module.exports = eventoController;
