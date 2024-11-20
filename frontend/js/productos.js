// Función para cargar los productos desde el backend y mostrarlos en la interfaz de usuario
async function loadProductos() {
    try {
        const response = await fetch('http://localhost:80/productos');
        const productos = await response.json();

        if (!response.ok) {
            throw new Error(productos.error || 'Error al cargar los productos');
        }

        // Contenedor donde se reemplazará el contenido con los productos
        const container = document.getElementById('productos-container');

        // Generar el HTML para cada producto
        let productosHtml = '';
        productos.forEach(producto => {
            var precio = parseFloat(producto.precio_item).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            productosHtml += `
                <div class="item" data-id="${producto.id}">
                    <button class="fas fa-times eliminar" ></button>
                    <span class="titulo-item">${producto.nombre_producto}</span>
                    <img src="data:${producto.imagen_tipo};base64,${producto.imagen_byte}" alt="${producto.nombre_producto}" class="img-item">
                    <span class="precio-item">$${precio}</span>
                    <p class="detalle-item" style="display: none;">${producto.descripcion}</p>
                    <button class="descripcion">Ver descripción</button>
                    <button class="boton-item">Agregar al Carrito</button>
                </div>
            `;
        });

        // Reemplazar el HTML del contenedor con el contenido generado
        container.innerHTML = productosHtml;
        var usuariojson = localStorage.getItem("Usuario");
        var usuario = JSON.parse(usuariojson);
        // Agregar eventos a los botones "Agregar al Carrito"
        const eliminar = document.getElementsByClassName('eliminar');
        const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
        const verDescripcion = document.getElementsByClassName('descripcion');
        for (let eliminando of eliminar) {
            if (usuario.rol !== "Administrador") {
                eliminando.style.display = 'none';
            }
            eliminando.addEventListener('click', eliminarProducto);
        }
        for (let button of botonesAgregarAlCarrito) {
            button.addEventListener('click', agregarAlCarritoClicked);
        }
        for (let detalle of verDescripcion) {
            detalle.addEventListener('click', Verdetalle);
        }
    } catch (err) {
        console.error('Error:', err.message);
        document.getElementById('productos-container').innerHTML =
            '<div>Error al cargar los productos. Inténtelo más tarde.</div>';
    }
}

// Función para manejar el evento de agregar productos al carrito
function eliminarProducto(event) {
    const button = event.target;
    const item = button.parentElement;
    const producto = item.getElementsByClassName('titulo-item')[0].innerText;
    const id_producto = item.getAttribute('data-id'); // Obtener el ID del producto desde el atributo del contenedor

    const fondooscuro = document.getElementsByClassName('fondooscuro')[0];
    if (fondooscuro) {
        fondooscuro.style.display = 'block';

        // Accede al elemento detalle y actualiza su contenido
        const detalle = fondooscuro.getElementsByClassName('contendidodetalle')[0];
        detalle.innerHTML = `<h1>¿Estás seguro de eliminar ${producto}</h1>
<p id="mensaje">Por favor, elige una opción:</p>
<button id="eliminar">Si eliminar</button>
<br>
<button id="noeliminar">No eliminar</button>`;
    }
    document.getElementById("eliminar").addEventListener("click", async (event) => {
        const response = await fetch('http://localhost:80/eliminarproducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_producto }), // Enviamos el ID del producto en el cuerpo de la solicitud
        });
        if (response.ok) {
            document.location.reload();
        }
        else {
            alert('Error al eliminar el producto');
        }
    });
    document.getElementById("noeliminar").addEventListener("click", (event) => {
        fondooscuro.style.display = 'none';
    });
}

function Verdetalle(event) {
    const button = event.target;
    const item = button.parentElement;

    const fondooscuro = document.getElementsByClassName('fondooscuro')[0];
    const titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    const descripcion = item.getElementsByClassName('detalle-item')[0].innerText;
    const id = item.getAttribute('data-id');

    if (fondooscuro) {
        fondooscuro.style.display = 'block';

        // Accede al elemento detalle y actualiza su contenido
        const detalle = fondooscuro.getElementsByClassName('contendidodetalle')[0];
        detalle.innerHTML = `
        <h1>Descripción del producto ${titulo}</h1>
        <p>${descripcion}</p>`;
    }
}
function agregarAlCarritoClicked(event) {
    const button = event.target;
    const item = button.parentElement;
    const titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    const precio = item.getElementsByClassName('precio-item')[0].innerText;
    const imagenSrc = item.getElementsByClassName('img-item')[0].src;
    const id = item.getAttribute('data-id'); // Obtener el ID del producto desde el atributo del contenedor


    agregarItemAlCarrito(titulo, precio, imagenSrc, id); // Pasar el ID a la función
    hacerVisibleCarrito();
}

// Cargar los productos cuando la página se carga
loadProductos();
