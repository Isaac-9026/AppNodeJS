require('dotenv').config();
const express = require('express');

//Es un mecanismo de seguridad que permite a un servidor backend (Node.js) especificar qué 
//orígenes (dominios, puertos o protocolos) tienen permiso para acceder a sus recursos,
const cors = require('cors'); //Interccambio de recursos entre dominios

//Permite trabajar con rutas de archivos y directorios de manera más sencilla y segura,
//independiente del sistema operativo (Windows, Linux, macOS).
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ── 1. Middlewares ──────────────────────────────────────────────
app.use(cors());
app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true })); // Para parsear datos de formularios (x-www-form-urlencoded)

// Servir archivos estáticos (frontend SPA)
app.use(express.static(path.join(__dirname, 'public')));

// ── Rutas API ────────────────────────────────────────────────
app.use('/api/productos', require('./routes/productos'));
app.use('/api/marcas', require('./routes/marcas'));

// ── 3. SPA: redirigir todo al index.html ────────────────────────
//Cualquier ruta que el usuario escriba en el navegador y que no haya sido definida previamente en mi código
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Error handler global ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

// ── Iniciar servidor ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API Productos: http://localhost:${PORT}/api/productos`);
  console.log(`API Marcas:    http://localhost:${PORT}/api/marcas\n`);
});

module.exports = app;