CREATE TABLE "Clinicas"(
    "id_clinica" INTEGER NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "direccion" VARCHAR(400) NOT NULL,
    "imagen" TEXT NOT NULL
);
ALTER TABLE
    "Clinicas" ADD PRIMARY KEY("id_clinica");
CREATE TABLE "Doctores"(
    "id_doctor" INTEGER NOT NULL,
    "codigo_doctor" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(250) NOT NULL,
    "edad" INTEGER NOT NULL,
    "id_clinica" INTEGER NOT NULL
);
ALTER TABLE
    "Doctores" ADD PRIMARY KEY("id_doctor");
CREATE TABLE "Citas"(
    "id_cita" INTEGER NOT NULL,
    "id_doctor" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "Citas" ADD PRIMARY KEY("id_cita");
ALTER TABLE
    "Citas" ADD CONSTRAINT "citas_id_doctor_foreign" FOREIGN KEY("id_doctor") REFERENCES "Doctores"("id_doctor");
ALTER TABLE
    "Doctores" ADD CONSTRAINT "doctores_id_clinica_foreign" FOREIGN KEY("id_clinica") REFERENCES "Clinicas"("id_clinica");