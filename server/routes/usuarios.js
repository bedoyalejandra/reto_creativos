const express = require("express");
const router = express.Router();

const { validar_usuario,
  guardar_usuario,
  eliminar_usuario,
  editar_usuario,
  ver_usuarios,
  ver_usuario } = require("../controllers/usuarios");

/**
 * Obtener todos los usuarios
 */
router.get("/usuarios", (req, res) => {
  ver_usuarios()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Usuarios consultados" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});


/**
 * Obtener un solo usuario
 */
router.get("/usuarios/:id", (req, res) => {
  let usuario = req.params.id;
  ver_usuario(usuario)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "Usuario consultado" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

/**
 * Guardar un usuario
 */
router.post("/usuarios", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_usuario = req.body;

    // Valida la información, si hay un error se envia al catch
    validar_usuario(info_usuario);


    // Guardar la persona en base de datos
    guardar_usuario(info_usuario)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "Usuario guardado", info: info_usuario });
      })
      .catch(error => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
  
});

/**
 * Eliminar un usuario
 */
router.delete("/usuarios/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let usuario = req.params.id;
  
      // Elimina el usuario en base de datos
      eliminar_usuario(usuario)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Usuario eliminado", info: info_usuario });
        })
        .catch(error => {
          res.send(error);
        });
  
      // Responder
    } catch (error) {
      res.send(error);
    }
    
  });

  /**
 * Actualizar un usuario
 */
router.put("/usuarios/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_usuario = req.body;
  
      // Actualiza el usuario en base de datos

      editar_usuario(info_usuario, id)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "Usuario editado", info: info_usuario });
        })
        .catch(error => {
          res.send(error);
        });
  
      // Responder
    } catch (error) {
      res.send(error);
    }
    
  });

module.exports = router;

