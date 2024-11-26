const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = 3000; // Puerto donde correrá la API

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Simulación de base de datos en memoria
let sensorData = [];

// Endpoint para recibir datos del sensor
app.post("/endpoint", async (req, res) => {
  const { temperatura, presion } = req.body;

  // Validación básica
  if (typeof temperatura !== "number" || typeof presion !== "number") {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  try {
    // Guardar los datos en la base de datos
    const newEntry = await prisma.sensorData.create({
      data: {
        temperatura,
        presion,
      },
    });

    console.log("Datos guardados en la BD:", newEntry);
    res
      .status(201)
      .json({ message: "Datos guardados correctamente", newEntry });
  } catch (error) {
    console.error("Error al guardar en la BD:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
// Endpoint para consultar los datos almacenados
app.get("/data", async (req, res) => {
  try {
    // Obtener todos los registros de la base de datos
    const data = await prisma.sensorData.findMany({
      orderBy: { timestamp: "desc" }, // Ordenar por fecha descendente
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener datos de la BD:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
