
const ServicePG = require("../services/postgres");


let validar_tipo_identificacion = tipo_identificacion => {
  if (!tipo_identificacion) {
    throw {
      ok: false,
      mensaje: "La información del tipo de identificacion es obligatoria."
    };
  }

  if (!tipo_identificacion.nombre) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }

};

let guardar_tipo_identificacion = async tipo_identificacion => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.tipos_identificacion(
              nombre)
              VALUES (
                  $1;`;

  let values = [
    tipo_identificacion.nombre
  ]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let consultar_tipos_identificacion = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM tipos_identificacion`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let consultar_tipo_identificacion = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM tipos_identificacion WHERE id = '${id}'`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let eliminar_tipo_identificacion = id => {
    let _service = new ServicePG();
    let sql = `DELETE FROM tipos_identificacion WHERE id= $1`;
    let values = [
      id
    ]
    let respuesta = _service.runSql(sql, values);
    return respuesta;
};

let editar_tipo_identificacion = async (tipo_identificacion, id) => {
    let _service = new ServicePG();
    let sql = `UPDATE tipos_identificacion set nombre = $1
                WHERE id = $2`;

    let values = [
      tipo_identificacion.nombre,
      id
    ]
    let respuesta = await _service.runSql(sql, values);
    return respuesta;
};
module.exports = { validar_tipo_identificacion,
                    guardar_tipo_identificacion,
                    consultar_tipos_identificacion,
                    consultar_tipo_identificacion,
                    eliminar_tipo_identificacion,
                    editar_tipo_identificacion };
