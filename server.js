require('dotenv').config(); //Acceder al puerto
const express = require('express'); //Framework

//Mecanismo  de seguridad, permite al backend especificar origenes permitidos
const cors = require('cors')

//Gestión de rutas seguras y compatibles. Windows \, Linux, MacOS /
const path = require('path');

//Puerto donde se ejecuta nuestro servidor
const app = express() //instancias
const PORT = process.env.PORT || 3000;

//1 .MIDDLEWARES (función intermedia)
app.use(cors()) //Backend - frontend
app.use(express.json()) //api
app.use(express.urlencoded({extended: true})) //form

//Archivos estáticos  servir (frontend)
app.use(express.static(path.join(__dirname, 'public')))

//Rutas (API) Test: Postman
app.use('/routes/productos', require('./routes/productos'))
app.use('/api/marcas', require('./routes/marcas'))

//3. Todo lo que no tiene ruta o el servidor no lo direccionar
//SPA = Single Page Aplication -> http://localhost:3000/
//Express V4: app.get('*', () => {})
//Express V5: app.get('/{*path}', () => {})
//req (require - solicitud)
//res (response - respuesta)
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Manejador de errores
app.use((err, req, res, next) =>{
  console.error(err)
  res.status(500).json({success: false, message: 'Error interno del servidor'})
})

//Inicializamos el servidor
app.listen(PORT, ()=> {
  //URL: Aplicacion Web
  console.log(`Servidor Web ejecutándose en http://localhost:${PORT}`)
  //API productos
  console.log(`API productos en http://localhost:${PORT}/api/productos`)
  //API marcas
  console.log(`API marcas en http://localhost:${PORT}/api/marcas`)
});

module.exports = app;