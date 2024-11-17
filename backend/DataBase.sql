-- Active: 1731857832734@@127.0.0.1@3306@eccomerce
CREATE DATABASE eccomerce;


-- especificamos la base de datos osea que base de datos usamos
USE eccomerce;

CREATE TABLE rol (
    -- el AUTO_INCREMENT va sumandole mas 1 a la id cada vez que recibe un insert, asi que es inecesario ingresar valor en el insert
    -- PRIMARY KEY vendria siendo como una credencial de la fila, como un dni por ejemplo, no se puede repetir
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    -- limitamos a 25 caracteres
    -- NOT NULL indica que si o si tiene que tener valor
    rol VARCHAR(25) NOT NULL
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(25) NOT NULL,
    apellido VARCHAR(25) NOT NULL,
    -- UNIQUE indica que solamente debe ser unico valor, osea no puede haber 2 valores iguales
    nombre_usuario VARCHAR(25) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL UNIQUE,
    clave VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    -- FOREIGN KEY indica que tiene una relacion con una tabla, en este caso con la tabla rol, para ser claros con una fila, por ejemplo para relacionar la fila 'admin' que tiene un ID 1, solamente colocamos esa id y listo, el usuario es admin
    -- REFERENCES indica a que tabla hace referencia
    -- CASCADE si se borra un rol, se borra tambien el usuario que tiene ese rol (osea la fila que estaba relacionada)
    FOREIGN KEY (id_rol) REFERENCES rol (id_rol) ON DELETE CASCADE
);

CREATE TABLE producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- LONGBLOB para almacenar imágenes como bytes 
    imagen_byte LONGBLOB,
    imagen_tipo VARCHAR(50) NOT NULL,
    nombre_producto VARCHAR(100) NOT NULL,
    -- TEXT indica que puede tener cualquier longitud, osea cualquier cantidad de caracteres
    descripcion TEXT,
    precio_item DECIMAL(65, 2) NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE
);


-- Como ves, acá no ingreso el id, porque ya es autoincrementable
INSERT INTO rol (rol) VALUES ('Administrador'), ('Cliente');

INSERT INTO usuario (nombre,apellido,nombre_usuario,correo,clave,id_rol) 
VALUES 
('Juan','Pérez','Juanpi','juan.perez@example.com','pass123',1),
('Ana', 'López', 'Cliente', 'ana.lopez@example.com', 'pass123', 2);