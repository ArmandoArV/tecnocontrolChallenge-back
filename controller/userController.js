const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

const userController = {
  validateUser: async (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM usuario WHERE email = ? AND password = ?";
    const params = [email, password];
    try {
      const result = await connection.query(sql, params);
      if (result.length > 0) {
        const token = jwt.sign(
          { email: result[0].email, id: result[0].id },
          config.key,
          { expiresIn: "1h" }
        );
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  },

  registerUser: async (req, res) => {
    const { email, password } = req.body;
    const query = "INSERT INTO usuario (email, password) VALUES (?, SHA2(?,224))";
    const params = [email, password];
    try {
      const [rows, fields] = await connection.execute(query, params);
      return res.status(200).json({ message: "Usuario registrado" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  },
};

module.exports = userController;
