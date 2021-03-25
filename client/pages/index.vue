<template>
  <v-container grid-list-xs>
    <template>
      <center>
        <h1>Agregar un usuario</h1>
      </center>
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
        <v-select v-model="usuario.rol" :items="roles" label="Rol"></v-select>

        <v-text-field
          v-model="usuario.celular"
          :counter="10"
          label="Celular"
        ></v-text-field>

        <v-text-field
          v-model="usuario.clave"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          label="Contraseña"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="guardar_usuario"
          >Guardar</v-btn
        >
      </v-form>
    </template>

    <v-data-table
      :headers="encabezados"
      :items="usuarios"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    <v-snackbar v-model="toast">
      {{ mensaje }}
      <v-btn color="pink" text @click="toast = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script src="../assets/usuarios.js" />
