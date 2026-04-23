CREATE DATABASE tiendanode;
USE tiendanode;

CREATE TABLE IF NOT EXISTS marcas(
	id 			INT AUTO_INCREMENT PRIMARY KEY,
    nombremarca VARCHAR(100) NOT NULL,
    create_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON
    UPDATE CURRENT_TIMESTAMP
)ENGINE = INNODB;


INSERT INTO marcas (nombremarca) VALUES ('Samsumg');
INSERT INTO marcas (nombremarca) VALUES ('AMD');
UPDATE marcas SET nombremarca = 'HP' WHERE id = 1;
SELECT * FROM marcas;


-- Garantía en meses
CREATE TABLE IF NOT EXISTS productos(
	id 			INT AUTO_INCREMENT PRIMARY KEY,
    idmarca		INT NOT NULL,
    nombre		VARCHAR(150) NOT NULL,
    precio		DECIMAL(7,2) NOT NULL,
    garantia	TINYINT COMMENT 'Se deberá indicar en meses',
    descripcion VARCHAR(100) NOT NULL,
    fechacompra	DATE NOT NULL,
    create_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_idmarca_prd FOREIGN KEY (idmarca) REFERENCES marcas (id)
)ENGINE = INNODB;

INSERT INTO productos
	(idmarca, nombre, precio, garantia, descripcion, fechacompra)
    VALUES
    (1, 'Monitor Led', 400, 24, 'Resolción Full HD - 60H', '2026-02-01'),
    (2, 'Microprocesador', 700, 12, 'Ryzen 5 - 5200', '2026-03-10');
    
UPDATE productos SET descripcion = 'Resolucion FULL HD - 120Hz' WHERE id = 1;
SELECT * FROM productos;