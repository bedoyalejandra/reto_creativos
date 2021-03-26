import axios from "axios";
import config from "./config/index";

import Vue from "vue";

export default {
  beforeMount() {
    this.cargarUsuarios();
  },
  data() {
    return {
      validacion_actualizar: false,
      dialog: false,
      dialogDelete: false,
      valid: false,
      toast: false,
      usuario: {},
      reglas: [v => !!v || "El campo es obligatorio."],
      reglaCorreo: [
        v => !!v || "El campo es obligatorio.",
        v => /.+@.+\..+/.test(v) || "El correo no es correcto."
      ],
    
      tipo_documentos: [1, 2, 3, 4],  
      roles: [{ value: null, text: "Seleccione un rol", disabled: true }],
      show1: false,
      encabezados: [
        { text: "Tipo de identificación", value: "tipo_identificacion" },
        { text: "Identificación", value: "identificacion" },
        { text: "Nombres", value: "nombres" },
        { text: "Apellidos", value: "apellidos" },
        { text: "Correo", value: "correo" },
        { text: "Rol", value: "rol" },
        { text: "Celular", value: "celular" },
        { text: "Acciones", value: "acciones", sortable: false }
      ],
      usuarios: [],
      editedIndex: -1,
      editedItem: {
        identificacion: "",
        tipo_identificacion: 3,
        nombres: "",
        apellidos: "",
        correo: "",
        rol: 1,
        celular: "",
        clave: ""
      },
      usuario: {
        identificacion: "",
        tipo_identificacion: 3,
        nombres: "",
        apellidos: "",
        correo: "",
        rol: 1,
        celular: "",
        clave: ""
      },
      mensaje: null
    };
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  methods: { 
    guardarUsuario() {
      if (this.$refs.form.validate()) {
        console.log(this.usuario);
        let url = config.url_api;
        axios
          .post(url + "usuarios", this.usuario)
          .then(respuesta => {
            this.reset();
            this.cargarUsuarios();
          })
          .catch(error => {});
      }
    },

    cargarUsuarios() {
      let url = config.url_api;
      axios
        .get(url + "usuarios")
        .then(respuesta => {
          let data = respuesta.data;
          if (data.ok) {
            this.usuarios = data.info;
            for(let i in this.usuarios){
              this.usuarios[i].acciones = true
            }
          }
          this.toast = true;
          this.mensaje = data.mensaje;
        })
        .catch(error => {
          this.toast = true;
          this.mensaje = "Ha ocurrido un error, intenta de nuevo. ";
        });

    },

    eliminarUsuario() {
      let url = config.url_api;
      console.log(this.editedItem);
      axios
        .delete(`${url}usuarios/${this.editedItem.identificacion}`)
        .then((response) => {
          this.usuarios.splice(this.editedIndex, 1);
          this.closeDelete()
        })
        .catch((error) => {
          console.log(error);
        });
        this.closeDelete()
    },

    cargarUsuario(item) {
      this.validacion_actualizar = true
      let url = config.url_api;
      axios
        .get(`${url}usuarios/${item.identificacion}`)
        .then((response) => {
          var datos = response.data.info;
          console.log(datos);
          this.usuario.tipo_identificacion = datos[0].tipo_identificacion;
          this.usuario.identificacion = datos[0].identificacion;
          this.usuario.nombres = datos[0].nombres;
          this.usuario.apellidos = datos[0].apellidos;
          this.usuario.clave = datos[0].clave;
          this.usuario.correo = datos[0].correo;
          this.usuario.rol = datos[0].rol;
          this.usuario.celular = datos[0].celular;
          this.usuario.acciones = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editarUsuario() {
      if (this.$refs.form.validate()) {
        let url = config.url_api;
        axios
          .put(`${url}usuarios/${this.usuario.identificacion}`, this.usuario)
          .then((response) => {
            console.log(response);
            let position = this.usuarios.findIndex(
              (usuario) => usuario.identificacion == this.usuario.identificacion
            );
            this.usuarios.splice(position, 1, this.usuario);
            this.usuario = {
              identificacion: "",
              tipo_identificacion: 3,
              nombres: "",
              apellidos: "",
              correo: "",
              rol: 1,
              celular: "",
              clave: ""
            };
            this.validacion_actualizar = false;
            this.reset();
          
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    
    },

    deleteItem (item) {
      this.editedIndex = this.usuarios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.usuarios.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
 
    
  },
};
