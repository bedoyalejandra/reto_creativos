import axios from "axios";
import config from "./config/index";

import Vue from "vue";

export default {
  beforeMount() {
    this.cargar_usuarios();
  },
  data() {
    return {
      valid: false,
      toast: false,
      usuario: {},
      reglas: [v => !!v || "El campo es obligatorio."],
      reglaCorreo: [
        v => !!v || "El campo es obligatorio.",
        v => /.+@.+\..+/.test(v) || "El correo no es correcto."
      ],
      tipo_documentos: [1, 2, 3, 4],
      roles: [1, 2, 3],
      show1: false,
      encabezados: [
        { text: "Tipo de identificación", value: "tipo_identificacion" },
        { text: "Identificación", value: "identificacion" },
        { text: "Nombres", value: "nombres" },
        { text: "Apellidos", value: "apellidos" },
        { text: "Correo", value: "correo" },
        { text: "Rol", value: "rol" },
        { text: "Celular", value: "celular" }
      ],
      usuarios: [],
      mensaje: null
    };
  },

  methods: { 
    guardar_usuario() {
      if (this.$refs.form.validate()) {
        console.log(this.usuario);
        let url = config.url_api;
        axios
          .post(url + "usuarios", this.usuario)
          .then(respuesta => {
            console.log(respuesta);
          })
          .catch(error => {});
      }
    },

    cargar_usuarios() {
      let url = config.url_api;
      axios
        .get(url + "usuarios")
        .then(respuesta => {
          let data = respuesta.data;
          if (data.ok) {
            this.usuarios = data.info;
          }
          this.toast = true;
          this.mensaje = data.mensaje;
        })
        .catch(error => {
          this.toast = true;
          this.mensaje = "Ha ocurrido un error, intenta de nuevo. ";
        });
    },

    cargar_roles() {
      let url = config.url_api;
      axios
        .get(url + "usuarios")
        .then(respuesta => {
          let data = respuesta.data;
          if (data.ok) {
            this.usuarios = data.info;
          }
          this.toast = true;
          this.mensaje = data.mensaje;
        })
        .catch(error => {
          this.toast = true;
          this.mensaje = "Ha ocurrido un error, intenta de nuevo. ";
        });
    },

    mostrar_roles() {
      axios
        .get(this.url + "roles", {
          headers: { token: this.token },
        })
        .then((response) => {
          let datos = response.data.info;
          for (let i in datos) {
            let temp = { value: "", text: "" };
            temp.value = datos[i].id;
            temp.text = datos[i].nombre;
            this.lista_roles.push(temp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cargar_usuario({ item }) {
      this.validacion_actualizar = true
      axios
        .get(`${this.url}usuarios/${item.id}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          var datos = response.data.info;

          this.inEdition = true;
          this.usuario.id = datos[0].id;
          this.usuario.nombre = datos[0].nombre;
          this.usuario.apellido = datos[0].apellidos;
          this.usuario.edad = datos[0].edad;
          //this.usuario.clave = datos[0].clave;
          this.usuario.correo = datos[0].correo;
          this.usuario.ciudad = datos[0].ciudad;
          this.usuario.rol = datos[0].rol;
          this.usuario.ocupacion = datos[0].ocupacion;
          this.usuario.acciones = true;
          this.usuario.primera_vez = datos[0].primera_vez;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizar_usuario() {
      if (this.usuario.id.length > 0 && this.usuario.nombre.length > 0 && this.usuario.apellido.length > 0
        && this.usuario.correo.length > 0 && this.usuario.clave.length > 0) {
        axios
          .put(`${this.url}usuarios/${this.usuario.id}`, this.usuario, {
            headers: { token: this.token },
          })
          .then((response) => {
            console.log(response);
            let position = this.lista_usuarios.findIndex(
              (usuario) => usuario.id == this.usuario.id
            );
            this.lista_usuarios.splice(position, 1, this.usuario);
            this.inEdition = false;
            this.usuario = {
              id: "",
              nombre: "",
              apellido: "",
              edad: 0,
              correo: "",
              clave: "",
              ciudad: "",
              ocupacion: null,
              rol: 0,
              acciones: true,
            };
            this.validacion_actualizar = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
      
    },
  },
};
