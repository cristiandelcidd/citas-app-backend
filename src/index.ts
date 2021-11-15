import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (_: Request, res: Response) => res.send("Hola Mundo"));

app.get("/clinicas", async (_: Request, res: Response) => {
  const clinicas = await prisma.clinicas.findMany();
  return res.send({ clinicas });
});

app.get("/clinicas/:id", async (req: Request, res: Response) => {
  const { params } = req;

  const clinicaFiltrada = await prisma.clinicas.findUnique({
    where: { id_clinica: +params.id },
  });

  return res.send({ clinica: clinicaFiltrada });
});

app.post("/clinicas", async (req: Request, res: Response) => {
  const { body } = req;

  const id = +Math.random().toString().split(".")[1].slice(0, 6);

  const clinicaCreada = await prisma.clinicas.create({
    data: { id_clinica: id, ...body },
  });

  return res.send({ clinica: clinicaCreada });
});

app.patch("/clinicas/:id", async (req: Request, res: Response) => {
  const { params, body } = req;

  try {
    const clinica = await prisma.clinicas.findUnique({
      where: { id_clinica: +params.id },
    });

    if (!clinica) {
      throw new Error("La clinica/hospital no existe.");
    }

    const clinicaActualizada = await prisma.clinicas.update({
      where: { id_clinica: +params.id },
      data: { ...body },
    });

    return res.send({ clinica: clinicaActualizada });
  } catch {
    return res.send("Error");
  }
});

app.get("/doctores", async (_: Request, res: Response) => {
  const doctores = await prisma.doctores.findMany();
  return res.send({ doctores });
});

app.get("/doctores/:id", async (req: Request, res: Response) => {
  const { params } = req;
  try {
    const doctor = await prisma.doctores.findUnique({
      where: { id_doctor: +params.id },
    });

    if (!doctor) {
      throw new Error("El doctor no existe.");
    }

    return res.send(doctor);
  } catch {
    return res.send("Error");
  }
});

app.post("/doctores", async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const id = +Math.random().toString().split(".")[1].slice(0, 6);

    const doctorCreado = await prisma.doctores.create({
      data: { id_doctor: id, ...body },
    });

    return res.send({ doctor: doctorCreado });
  } catch {
    return res.send("Error algo esta mal");
  }
});

app.patch("/doctores/:id", (_: Request, res: Response) => {
  return res.send("Actualizando Doctor");
});

app.listen(9000, () => console.log("Listening on port 9000"));
