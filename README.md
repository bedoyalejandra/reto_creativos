# Reto Creativos

Realizar las operaciones CRUD (Create, read, update, delete) para un formulario de usuarios
que tiene la siguiente información:
- Tipo de identificación
- Identificación
- Nombres
- Apellidos
- Correo
- Rol [Administrador, usuario, cliente]
- Celular
- Contraseña (Se debe de guardar cifrada)

## Realizado por Alejandra Bedoya

# Query DataBase

```sql
DROP TABLE IF EXISTS "public"."roles";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS roles_id_seq;

-- Table Definition
CREATE TABLE "public"."roles" (
    "id" int4 NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
    "nombre" varchar NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."roles" ("id", "nombre") VALUES
('1', 'Administrador'),
('2', 'Usuario'),
('3', 'Cliente');
```

```sql
DROP TABLE IF EXISTS "public"."tipos_identificacion";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tipos_identificacion_id_seq;

-- Table Definition
CREATE TABLE "public"."tipos_identificacion" (
    "id" int4 NOT NULL DEFAULT nextval('tipos_identificacion_id_seq'::regclass),
    "nombre" varchar NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."tipos_identificacion" ("id", "nombre") VALUES
('1', 'Registro Civil'),
('2', 'Tarjeta de identidad'),
('3', 'Cedula de Ciudadanía'),
('4', 'Cedula de Extranjería'),
('5', 'Pasaporte');
```

```sql
DROP TABLE IF EXISTS "public"."usuarios";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."usuarios" (
    "identificacion" varchar NOT NULL,
    "tipo_identificacion" int4 NOT NULL,
    "nombres" varchar NOT NULL,
    "apellidos" varchar NOT NULL,
    "correo" varchar,
    "rol" int4 NOT NULL,
    "celular" varchar,
    "clave" varchar,
    CONSTRAINT "usuarios_rol_fkey" FOREIGN KEY ("rol") REFERENCES "public"."roles"("id"),
    CONSTRAINT "usuarios_tipo_identificacion_fkey" FOREIGN KEY ("tipo_identificacion") REFERENCES "public"."tipos_identificacion"("id"),
    PRIMARY KEY ("identificacion")
);
```
