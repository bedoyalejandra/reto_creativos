
const ServicePG = require("../services/postgres");


let validar_rol = rol => {
  if (!rol) {
    throw {
      ok: false,
      mensaje: "La información del rol es obligatoria."
    };
  }

  if (!rol.nombre) {
    throw { ok: false, mensaje: "El nombre es obligatorio." };
  }

};

let guardar_rol = async rol => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.roles(
              nombre)
              VALUES (
                  $1;`;

  let values = [
    rol.nombre
  ]
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let consultar_roles = async () => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM roles`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let consultar_rol = async (id) => {
  let _service = new ServicePG();
  let sql = `SELECT * FROM roles WHERE id = '${id}'`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let eliminar_rol = id => {
    let _service = new ServicePG();
    let sql = `DELETE FROM roles WHERE id= $1`;
    let values = [
      id
    ]
    let respuesta = _service.runSql(sql, values);
    return respuesta;
};

let editar_rol = async (rol, id) => {
    let _service = new ServicePG();
    let sql = `UPDATE roles set nombre = $1
                WHERE id = $2`;

    let values = [
      rol.nombre,
      id
    ]
    let respuesta = await _service.runSql(sql, values);
    return respuesta;
};
module.exports = { validar_rol,
                    guardar_rol,
                    consultar_roles,
                    consultar_rol,
                    eliminar_rol,
                    editar_rol };
