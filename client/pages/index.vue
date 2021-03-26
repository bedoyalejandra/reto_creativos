<template>
  <v-container grid-list-xs>
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-select
          v-model="usuario.tipo_identificacion"
          :items="tipo_documentos"
          :rules="[(v) => !!v || 'El tipo de identificación es obligatorio']"
          label="Tipo de identificación"
          required
        ></v-select>

        <v-text-field
          v-model="usuario.identificacion"
          :rules="reglas"
          label="Identificación"
          :disabled="validacion_actualizar"
          required
        ></v-text-field>

        <v-text-field
          v-model="usuario.nombres"
          :rules="reglas"
          label="Nombres"
          required
        ></v-text-field>
        <v-text-field
          v-model="usuario.apellidos"
          :rules="reglas"
          label="Apellidos"
          required
        ></v-text-field>
        <v-text-field
          v-model="usuario.correo"
          :rules="reglaCorreo"
          label="Correo"
        ></v-text-field>
        <v-select
          v-model="usuario.rol"
          :items="roles"
          label="Rol"
          :rules="[(v) => !!v || 'El rol es obligatorio']"
        ></v-select>

        <v-text-field
          v-model="usuario.celular"
          :counter="10"
          label="Celular"
        ></v-text-field>

        <v-text-field
          v-model="usuario.clave"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          v-if="!validacion_actualizar"
          label="Contraseña"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn
          color="primary"
          block
          v-if="!validacion_actualizar"
          @click="guardarUsuario"
          >Guardar</v-btn
        >

        <v-btn color="primary" block @click="editarUsuario" v-else
          >Editar</v-btn
        >
      </v-form>
    </template>

    <template>
      <v-data-table
        :headers="encabezados"
        :items="usuarios"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >¿Está seguro de eliminar este usuario?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="eliminarUsuario"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:[`item.acciones`]="{ item }">
          <v-icon small class="mr-2" @click="cargarUsuario(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </template>
  </v-container>
</template>

<script src="../assets/usuarios.js" />
