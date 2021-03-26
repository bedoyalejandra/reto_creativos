const express = require("express");
const router = express.Router();

const { validar_tipo_identificacion,
    guardar_tipo_identificacion,
    consultar_tipos_identificacion,
    consultar_tipo_identificacion,
    eliminar_tipo_identificacion,
    editar_tipo_identificacion } = require("../controllers/tipos_identificacion");

/**
 * Obtener todos los tipos_identificacion
 */
router.get("/tipos_identificacion", (req, res) => {
  consultar_tipos_identificacion()
    .then(answerDB => {
      let records = answerDB.rows;
      res.send({ ok: true, info: records, mensaje: "Tipos consultados" });
    
    })
    .catch(error => {
      res.send(error);
    });
    
});

/**
 * Obtener un solo tipo_identificacion
 */
router.get("/tipos_identificacion/:id", (req, res) => {
  let info_tipo_identificacione = req.params.id;
  consultar_tipo_identificacion(info_tipo_identificacione)
  .then(answerDB => {
    let records = answerDB.rows;
    res.send({ ok: true, info: records, mensaje: "tipo_identificacion consultado" });
  
  })
  .catch(error => {
    res.send(error);
  });
  
});

/**
 * Guardar un tipo_identificacion
 */
router.post("/tipos_identificacion", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_tipo_identificacione = req.body;

    // Valida la información, si hay un error se envia al catch
    validar_tipo_identificacion(info_tipo_identificacione);

    // Guardar el tipo_identificacion en base de datos
    guardar_tipo_identificacion(info_tipo_identificacione)
      .then(answerDB => {
        res.send({ ok: true, mensaje: "tipo_identificacion guardado", info: info_tipo_identificacione });
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
 * Eliminar un tipo_identificacion
 */
router.delete("/tipos_identificacion/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let info_tipo_identificacione = req.params.id;
  
      // Elimina el tipo_identificacion en base de datos
      eliminar_tipo_identificacion(info_tipo_identificacione)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "tipo_identificacion eliminado", info: info_tipo_identificacione });
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
 * Actualizar un tipo_identificacion
 */
router.put("/tipos_identificacion/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_tipo_identificacione = req.body;
  
      // Actualiza el tipo_identificacion en base de datos
      editar_tipo_identificacion(info_tipo_identificacione, id)
        .then(answerDB => {
          res.send({ ok: true, mensaje: "tipo_identificacion editado", info: info_tipo_identificacione });
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

