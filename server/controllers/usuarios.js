const ServicePG = require("../services/postgres");

let validar_usuario = (usuario) => {
  if (!usuario) {
    throw {
      ok: false,
      mensaje: "La información de la persona es obligatoria.",
    };
  }

  if (!usuario.identificacion) {
    throw { ok: false, mensaje: "La cédula es obligatoria." };
  }
  if (!usuario.nombres) {
    throw { ok: false, mensaje: "El nombres es obligatorio." };
  }
  if (!usuario.apellidos) {
    throw { ok: false, mensaje: "El apellidos es obligatorio." };
  }
};

let guardar_usuario = async (usuario) => {
  let _service = new ServicePG();
  let sql = `INSERT INTO public.usuarios(
              identificacion, tipo_identificacion, nombres, apellidos, correo, rol, celular, clave)
              VALUES (
                  $1,
                  $2,
                  $3,
                  $4,
                  $5,
                  $6,
                  $7,
                  md5($8)
                  );`;

  let values = [
    usuario.identificacion,
    usuario.tipo_identificacion,
    usuario.nombres,
    usuario.apellidos,
    usuario.correo,
    usuario.rol,
    usuario.celular,
    usuario.clave,
  ];

  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};

let ver_usuarios = async () => {
  let _service = new ServicePG();
  let sql = `SELECT usuarios.identificacion, 
                    tipos_identificacion.nombre as "tipo_identificacion", 
                    usuarios.nombres, usuarios.apellidos, usuarios.correo, 
                    roles.nombre as "rol", usuarios.celular 
                    FROM usuarios 
                    INNER JOIN roles ON usuarios.rol = roles.id 
                    INNER JOIN tipos_identificacion ON usuarios.tipo_identificacion = tipos_identificacion.id;`;
  let respuesta = await _service.runSql(sql);
  return respuesta;
};

let ver_usuario = async (identificacion) => {
  let _service = new ServicePG();
  let sql = `SELECT usuarios.identificacion, 
                    tipos_identificacion.nombre as "tipo_identificacion", 
                    usuarios.nombres, usuarios.apellidos, usuarios.correo, 
                    roles.nombre as "rol", usuarios.celular 
                    FROM usuarios 
                    INNER JOIN roles ON usuarios.rol = roles.id 
                    INNER JOIN tipos_identificacion ON usuarios.tipo_identificacion = tipos_identificacion.id
                    WHERE identificacion = $1;`;
  let values = [identificacion];
  let respuesta = _service.runSql(sql, values);
  return respuesta;
};

let eliminar_usuario = (identificacion) => {
  let _service = new ServicePG();
  let sql = `DELETE FROM usuarios WHERE identificacion = $1`;
  let values = [identificacion];
  let respuesta = _service.runSql(sql, values);
  return respuesta;
};

let editar_usuario = async (usuario, identificacion) => {
  let _service = new ServicePG();
  let sql = `UPDATE usuarios set tipo_identificacion = $1,
                 nombres = $2,
                 apellidos = $3,
                 correo = $4,
                 rol = $5,
                 celular = $6,
                 clave = md5($7)
                 WHERE identificacion = $8`;

  let values = [
    usuario.tipo_identificacion,
    usuario.nombres,
    usuario.apellidos,
    usuario.correo,
    usuario.rol,
    usuario.celular,
    usuario.clave,
    identificacion,
  ];
  let respuesta = await _service.runSql(sql, values);
  return respuesta;
};


module.exports = {
  validar_usuario,
  guardar_usuario,
  eliminar_usuario,
  editar_usuario,
  ver_usuarios,
  ver_usuario,
};
