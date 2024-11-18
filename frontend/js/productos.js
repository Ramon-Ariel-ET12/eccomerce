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

        // Agregar eventos a los botones "Agregar al Carrito"
        const verDescripcion = document.getElementsByClassName('descripcion');
        const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
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
function Verdetalle(event) {
    const button = event.target;
    const item = button.parentElement;

    const fondooscuro = document.getElementsByClassName('fondooscuro')[0];
    const descripcion = item.getElementsByClassName('detalle-item')[0].innerText;
    const id = item.getAttribute('data-id');

    if (fondooscuro) {
        fondooscuro.style.display = 'block';

        // Accede al elemento detalle y actualiza su contenido
        const detalle = fondooscuro.getElementsByClassName('detalle')[0];
        detalle.querySelector('p').innerText = descripcion;
    }
}
function agregarAlCarritoClicked(event) {
    const button = event.target;
    const item = button.parentElement;
    const titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    const precio = item.getElementsByClassName('precio-item')[0].innerText;
    const imagenSrc = item.getElementsByClassName('img-item')[0].src;
    const id = item.getAttribute('data-id'); // Obtener el ID del producto desde el atributo del contenedor

    console.log(`Agregando producto al carrito: ID=${id}, Título=${titulo}, Precio=${precio}, Imagen=${imagenSrc}`);

    agregarItemAlCarrito(titulo, precio, imagenSrc, id); // Pasar el ID a la función
    hacerVisibleCarrito();
}

// Cargar los productos cuando la página se carga
loadProductos();
