async function loadProductos() {
    try {
        // Fetch products from the backend
        const response = await fetch('http://localhost:80/productos');
        const productos = await response.json();
        console.log('Fetched productos:', productos); // Log the fetched products

        if (!response.ok) {
            throw new Error(productos.error || 'Error al cargar los productos');
        }

        // Container to replace with products
        const container = document.getElementById('productos-container');

        // Generate HTML for each product, maintaining the structure of the static design
        let productosHtml = '';
        productos.forEach(producto => {
            console.log('Processing producto:', producto); // Log each product
            // Use the base64 image directly from the producto object
            productosHtml += `
                <div class="item">
                    <span class="titulo-item">${producto.nombre_producto}</span>
                    <img src="data:${producto.imagen_tipo};base64,${producto.imagen_byte}" alt="${producto.nombre_producto}" class="img-item">
                    <span class="precio-item">$${producto.precio_item}</span>
                    <button class="boton-item" data-id="${producto.id}">Agregar al Carrito</button>
                </div>
            `;
        });

        // Replace the container's HTML with the generated content
        container.innerHTML = productosHtml;

        // Add event listeners to the "Agregar al Carrito" buttons
        const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
        for (let button of botonesAgregarAlCarrito) {
            button.addEventListener('click', agregarAlCarritoClicked);
        }
    } catch (err) {
        console.error('Error:', err.message);
        document.getElementById('productos-container').innerHTML =
            '<div>Error al cargar los productos. Inténtelo más tarde.</div>';
    }
}

// Function to handle adding items to the cart
function agregarAlCarritoClicked(event) {
    const button = event.target;
    const item = button.parentElement;
    const titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    const precio = item.getElementsByClassName('precio-item')[0].innerText;
    const imagenSrc = item.getElementsByClassName('img-item')[0].src;
    const id = button.getAttribute('data-id'); // Get the product ID

    console.log(`Adding product to cart: ID=${id}, Title=${titulo}, Price=${precio}, Image=${imagenSrc}`);

    agregarItemAlCarrito(titulo, precio, imagenSrc, id); // Pass the ID to the function
    hacerVisibleCarrito();
}

// Load products when the page loads
loadProductos();