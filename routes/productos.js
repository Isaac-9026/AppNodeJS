const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Retorna todos los productos
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM productos ORDER BY nombre ASC",
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al obtener productos",
      error: err.message,
    });
  }
});


//Buscador por ID => exitoso (>0)
router.get("/:id", async (req, res) => {
  try {
    //params = valor ingresa por la URL
    const idbuscado = req.params.id;
    const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [
      idbuscado,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrada" });
    }

    //status(200) default
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error en el buscador de productos",
      error: err.message,
    });
  }
});

//Guardar
router.post("/", async (req, res) => {
  try {
    const { idmarca, nombre, precio, garantia, descripcion, fechacompra } = req.body;

    //Validación
    if (!idmarca || !nombre || !precio || !garantia || !descripcion || !fechacompra) {
      return res
        .status(400)
        .json({
          success: false,
          message: "El nombre del producto es requerido",
        });
    }

    //Inserción
    const [result] = await db.query(
      "INSERT INTO productos (idmarca, nombre, precio, garantia, descripcion, fechacompra) VALUES (?,?,?,?,?,?)",
      [idmarca, nombre, precio, garantia, descripcion, fechacompra]
    );
    res
      .status(201)
      .json({
        success: true,
        message: "Producto creado correctamente",
        id: result.insertId,
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "No se pudo crear el producto",
      error: err.message,
    });
  }
});

//Actulizar
router.put("/:id", async (req, res) => {
  try {
    const { nombre, precio, garantia, descripcion, fechacompra } = req.body;

    //Validación
    if (!nombre || !precio || !garantia || !descripcion || !fechacompra) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Los datos del producto son requeridos",
        });
    }

    //Consulta
    const [result] = await db.query(
      "UPDATE productos SET nombre = ?, precio = ?, garantia = ?, descripcion = ?, fechacompra = ? WHERE id = ?",
      [nombre, precio, garantia, descripcion, fechacompra, req.params.id],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }
    //status = 200 default
    res.json({ success: true, message: "Producto actualizado correctamente " });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al obtener productos",
      error: err.message,
    });
  }
});

//Eliminar
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM productos WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Producto eliminado correctamente",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar producto",
      error: err.message,
    });
  }
});

module.exports = router;