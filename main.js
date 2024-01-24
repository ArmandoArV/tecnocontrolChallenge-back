const express = require("express");
const cors = require("cors");

const eventoRouter = require("./routes/evento");
const unidadRouter = require("./routes/unidad");
const userRouter = require("./routes/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/", eventoRouter);
app.use("/", unidadRouter);
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
