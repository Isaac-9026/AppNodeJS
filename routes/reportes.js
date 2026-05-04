const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const db = require("../config/db");

//Ruta para generar un reporte de productos
router.get("/productos", async (req, res) => {
  const sql = `
  SELECT
    p.id,
      p.idmarca,
      p.nombre,
      p.precio,
      p.garantia,
      p.descripcion,
      p.fechacompra,
    m.nombremarca
  FROM productos p
  INNER JOIN marcas m ON p.idmarca = m.id
  WHERE garantia = 12 AND YEAR(fechacompra) = 2026
  `;

  //db.query(consultasql, [param1, param2, paramN])
  //Informacion entrega (input) - req (requiere)  req.params | req.body
  const [productos] = await db.query(sql);

  //Construir el PDF
  //Paso 1: Especifiicar al navegador que le enviaremos un PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=report.pdf"); //Descargar

  //PASO 2: Configuración de la hoja de reporte
  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(res); //Enviamos el PDF al navegador

  //PASO 3: Contenido
  doc.fontSize(18).text("Reporte de Productos", { align: "center" });
  doc.moveDown();

  //Recorrer cada elemento encontrado y enviarle al PDF...
  doc.table().row(['Nombre', 'Precio', 'Garantía']) //Cabecera

  productos.forEach((producto) => {
    //doc.fontSize(12).text(producto.descripcion);
    doc.table({
      data: [
        [producto.nombre, producto.precio, producto.garantia]]
    })
  });

  const lorem = `orem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus
       nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla 
       hendrerit. Ut nec accumsan nisl.`;

  doc.text(`Total de productos: ${productos.length}`);
  doc.moveDown()
  doc.text(lorem, { width: 500, align: "justify" });

  //PASO 4: Finalizar la creación del PDF
  doc.end();
});

module.exports = router;
