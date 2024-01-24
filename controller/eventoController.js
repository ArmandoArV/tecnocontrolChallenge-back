const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

const eventoController = {
  getEventos: async (req, res) => {
    const sql = `SELECT * FROM Evento`;
    try {
      const result = await connection.query(sql);
      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getEvento: async (req, res) => {
    const idEvento = req.params.idEvento;
    const sql = `SELECT * FROM Evento WHERE idEvento = ?`;
    try {
      const result = await connection.query(sql, [idEvento]);
      if (result.length === 0) {
        res.status(404).json({ message: "Event not found" });
      } else {
        res.json(result[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  addEvento: async (req, res) => {
    const sql = `
      INSERT INTO Evento (Unidad_idGps, name_device, date_message, idMessage, dsc_Message, latitud, longitud, velocidad, ignicion, odometro_kms, dir)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const {
        Unidad_idGps, // Assuming this is the ID of the associated unit
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
        Unidad_idGps,
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

  getEventosByDateAndIdGps: async (req, res) => {
    const { dtini, dtfin, idGps } = req.params;

    if (!dtini || !dtfin || !idGps) {
      return res
        .status(400)
        .json({ message: "dtini, dtfin, and idGps are required." });
    }

    const sql = `
      SELECT * 
      FROM Evento 
      WHERE date_message BETWEEN ? AND ? AND Unidad_idGps = ?
    `;

    try {
      const result = await connection.query(sql, [dtini, dtfin, idGps]);

      if (result[0].length === 0) {
        return res.status(404).json({
          message: `No events found for idGps ${idGps} between ${dtini} and ${dtfin}.`,
        });
      }

      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = eventoController;
