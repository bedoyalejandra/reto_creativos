
// Importar express
const express = require("express");
const cors = require("cors");

// Inicializar la librería
const app = express();
app.use(express.json());
app.use(cors());
// VERSION del api
const vs = "/api/v1/";

const ruta_usuarios = require("./routes/usuarios");

app.use(vs, ruta_usuarios);

app.use('/', (req, res) => {
  res.status(404).send({
    ok: false, message: 'El recurso que busca no existe'
  })
});

// Puerto
const port = 8000;
app.listen(port, () => {
  console.log(`Escuchando API en http://localhost:${port}/api/v1/`);
});

