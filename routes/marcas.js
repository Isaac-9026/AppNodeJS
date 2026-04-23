const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Retorna todas las marcas
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM marcas ORDER BY nombremarca ASC",
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al obtener marcas",
      error: err.message,
    });
  }
});

//Buscador por ID => exitoso (>0)
router.get("/:id", async (req, res) => {
  try {
    //params = valor ingresa por la URL
    const idbuscado = req.params.id;
    const [rows] = await db.query("SELECT * FROM marcas WHERE id = ?", [
      idbuscado,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }

    //status(200) default
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error en el buscador de marcas",
      error: err.message,
    });
  }
});

//Guardar
router.post("/", async (req, res) => {
  try {
    const { nombremarca } = req.body;

    //Validación
    if (!nombremarca || nombremarca.trim() === "") {
      return res
        .status(400)
        .json({
          success: false,
          message: "El nombre de la marca es requerido",
        });
    }

    //Inserción
    const [result] = await db.query(
      "INSERT INTO marcas (nombremarca) VALUES (?)",
      [nombremarca],
    );
    res
      .status(201)
      .json({
        success: true,
        message: "Marca creada correctamente",
        id: result.insertId,
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "No se pudo crear la marca",
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { nombremarca } = req.body;

    //Validación
    if (!nombremarca || nombremarca.trim() === "") {
      return res
        .status(400)
        .json({
          success: false,
          message: "El nombre de la marca es requerido",
        });
    }

    //Consulta
    const [result] = await db.query(
      "UPDATE marcas SET nombremarca = ? WHERE id = ?",
      [nombremarca, req.params.id],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }

    //status = 200 default
    res.json({ success: true, message: "Marca actualizada correctamente " });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al obtener marcas",
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    //Hace falta una validación ... ¿? (Dependencia foránea)
    const [productos] = await db.query(
      "SELECT COUNT(*) as total FROM productos WHERE idmarca = ?",
      req.params.id,
    );

    if (productos[0].total > 0) {
      return res
        .status(409)
        .json({
          success: false,
          message:
            "No se puede eliminar la marca porque tiene productos asociados",
          products: productos[0].total,
        });
    }

    const [result] = await db.query("DELETE FROM marcas WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No existe la marca" });
    }

    res.json({ success: true, message: "Marca eliminada correctamente" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al borrar marcas",
      error: err.message,
    });
  }
});

module.exports = router;
