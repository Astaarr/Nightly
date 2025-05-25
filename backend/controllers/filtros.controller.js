import { db } from "../db/connection.js";

export const filtrarLugares = async (req, res) => {
  const {
    ciudad,
    edadMinima,
    edadMaxima,
    formalidad,
    ambiente,
    tamano
  } = req.query;

  let query = "SELECT * FROM lugares WHERE 1=1";
  const params = [];

  if (ciudad) {
    query += " AND ciudad = ?";
    params.push(ciudad);
  }
  if (edadMinima) {
    query += " AND edad_minima <= ?";
    params.push(edadMinima);
  }
  if (edadMaxima) {
    query += " AND edad_maxima >= ?";
    params.push(edadMaxima);
  }
  if (formalidad) {
    query += " AND nivel_formalidad = ?";
    params.push(formalidad);
  }
  if (ambiente) {
    query += " AND ambiente = ?";
    params.push(ambiente);
  }
  if (tamano) {
    query += " AND tamano_grupo = ?";
    params.push(tamano);
  }

  try {
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Error al filtrar lugares:", error);
    res.status(500).json({ message: "Error al filtrar lugares" });
  }
};

export const filtrarEventos = async (req, res) => {
  const {
    ciudad,
    edadMinima,
    edadMaxima,
    formalidad,
    ambiente,
    tamano,
    tipoMusica
  } = req.query;

  let query = `
    SELECT e.* FROM eventos e
    JOIN lugares l ON e.id_lugar = l.id_lugar
    WHERE 1=1
  `;

  const params = [];

  if (ciudad) {
    query += " AND l.ciudad = ?";
    params.push(ciudad);
  }
  if (edadMinima) {
    query += " AND e.edad_minima <= ?";
    params.push(edadMinima);
  }
  if (edadMaxima) {
    query += " AND e.edad_maxima >= ?";
    params.push(edadMaxima);
  }
  if (formalidad) {
    query += " AND e.nivel_formalidad = ?";
    params.push(formalidad);
  }
  if (ambiente) {
    query += " AND e.ambiente = ?";
    params.push(ambiente);
  }
  if (tamano) {
    query += " AND e.tamano_grupo = ?";
    params.push(tamano);
  }
  if (tipoMusica) {
    query += " AND e.tipo_musica = ?";
    params.push(tipoMusica);
  }

  try {
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Error al filtrar eventos:", error);
    res.status(500).json({ message: "Error al filtrar eventos" });
  }
};
