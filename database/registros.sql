USE tiendanode;

-- Más marcas
INSERT INTO marcas (nombremarca) VALUES 
('Lenovo'),
('Dell'),
('Asus'),
('Acer'),
('MSI');

-- Más productos
INSERT INTO productos
(idmarca, nombre, precio, garantia, descripcion, fechacompra)
VALUES
(3, 'Laptop ThinkPad', 2500.00, 24, 'Core i7 - 16GB RAM - 512GB SSD', '2026-01-15'),
(5, 'Placa Madre', 850.00, 18, 'Chipset B550 - Soporte Ryzen', '2026-03-05'),
(6, 'Monitor Gamer', 1200.00, 24, '27 pulgadas - 165Hz', '2026-03-18'),
(7, 'Laptop Gamer', 3500.00, 12, 'RTX 4060 - 16GB RAM', '2026-04-01'),
(2, 'Tarjeta de Video', 1800.00, 12, 'Radeon RX 7600', '2026-04-10'),
(1, 'Impresora', 650.00, 12, 'Multifuncional WiFi', '2026-04-15');

SELECT * FROM marcas;