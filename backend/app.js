// Para ejecutar el backend, necesitas tener Node.js instalado en tu máquina.

// Para correr la aplicación, usa el siguiente comando en la terminal:
// node [nombre_del_archivo.js] (ej. node app.js)

// Primero, instalamos las dependencias necesarias usando npm:
// npm install express       // Para instalar Express, un framework web para Node.js
// npm install mysql2        // Para instalar el paquete mysql2 para interactuar con MySQL
// npm install cors          // Para habilitar CORS (Cross-Origin Resource Sharing)

// Requerimos las dependencias que acabamos de instalar
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Creamos una instancia de Express
const app = express();
// Definimos el puerto en el que el servidor escuchará
const port = 80;

// Habilitamos CORS para permitir solicitudes de orígenes diferentes
app.use(cors());

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Store image in memory

// Habilitamos la capacidad de Express para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Conectamos con la base de datos MySQL
const db = mysql.createConnection(
    { host: 'localhost', user: 'root', password: 'root', database: 'eccomerce' }
);

// Establecemos la conexión con la base de datos y gestionamos posibles errores
db.connect((err) => {
    if (err) {
        // Si ocurre un error de conexión, lo mostramos en la consola
        console.error('Error de conexión a la base de datos:', err.message);
    } else {
        // Si la conexión es exitosa, mostramos un mensaje en la consola
        console.log('Conexión exitosa a la base de datos');
    }
});

// Ruta GET para obtener todos los usuarios de la base de datos
// 'req' contiene la solicitud del cliente y 'res' contiene la respuesta que enviaremos al cliente
app.get('/', async function (req, res) {
    try {
        // Realizamos una consulta para obtener todos los usuarios
        const [rows] = await db.promise().query('SELECT * FROM usuario');
        // Respondemos al cliente con los datos obtenidos en formato JSON
        res.json(rows);
    } catch (err) {
        // Si hay un error en la consulta, lo manejamos y respondemos con un error
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en la consulta de la base de datos' });
    }
});


app.get('/productos', async (req, res) => {
    try {
        const query = 'SELECT id, nombre_producto, descripcion, precio_item, imagen_tipo, imagen_byte FROM producto';
        const [rows] = await db.promise().query(query);

        // Map through the rows to convert imagen_byte to base64
        const productos = rows.map(producto => {
            return {
                id: producto.id,
                nombre_producto: producto.nombre_producto,
                descripcion: producto.descripcion,
                precio_item: producto.precio_item,
                imagen_tipo: producto.imagen_tipo,
                imagen_byte: producto.imagen_byte ? producto.imagen_byte.toString('base64') : null // Convert to base64
            };
        });

        res.json(productos);
    } catch (err) {
        console.error('Error al recuperar los productos:', err);
        res.status(500).json({ error: 'Error al recuperar los productos' });
    }
});


app.post('/subir-productos', upload.single('imagen_byte'), async (req, res) => {
    const { nombre_producto, precio_item, descripcion, id_usuario } = req.body;
    const imagen_byte = req.file;

    if (!nombre_producto || !precio_item || !descripcion || !imagen_byte) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        // Insert into the database
        const query = `INSERT INTO producto (nombre_producto, descripcion, precio_item, imagen_byte, imagen_tipo, id_usuario)
                        VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await db.promise().query(query, [
            nombre_producto,
            descripcion,
            precio_item,
            imagen_byte.buffer, // Lo guarda en binario
            imagen_byte.mimetype, // Guarda el tipo de imagen
            id_usuario,
        ]);

        res.json({ message: 'Producto subido exitosamente', productId: result.insertId });
    } catch (err) {
        console.error('Error al guardar el producto:', err);
        res.status(500).json({ error: 'Error al guardar el producto en la base de datos' });
    }
});

// Ruta POST para el login, que se activa con el submit del formulario de login
// El cliente debe enviar un 'username', 'password' y 'role' en el cuerpo de la solicitud
app.post('/login', async function (req, res) {
    // Extraemos las credenciales del cuerpo de la solicitud
    const { username, password, role } = req.body;

    // Si alguno de los campos necesarios no está presente, respondemos con un error
    if (!username || !password || !role) {
        return res.status(400).json({ error: 'Se requieren el nombre de usuario, la contraseña y el rol' });
    }

    try {
        // Realizamos una consulta a la base de datos para verificar las credenciales del usuario
        const [rows] = await db.promise().query(
            'SELECT * FROM usuario INNER JOIN rol ON usuario.id_rol = rol.id_rol WHERE (nombre_usuario = ? OR correo = ?) AND clave = ? AND rol.rol = ?',
            [username, username, password, role]
        );

        // Si encontramos un usuario con las credenciales correctas, respondemos con los datos del usuario
        if (rows.length > 0) {
            res.json({ message: 'Login exitoso', user: rows[0] });
            console.log('Login exitoso', rows[0]);

        } else {
            // Si no encontramos al usuario o las credenciales son incorrectas, respondemos con un error
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (err) {
        // Si hay un error en la consulta, lo manejamos y respondemos con un error
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error en la consulta de la base de datos' });
    }
});

// Iniciamos el servidor y lo configuramos para escuchar en el puerto especificado
app.listen(port, function () {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
