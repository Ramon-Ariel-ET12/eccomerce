        // Agregar el evento submit al formulario de login
        document.getElementById('loginForm').addEventListener('submit', async function (event) {
            event.preventDefault(); // Evita el comportamiento predeterminado de submit que recarga la página
            
            // Obtener los valores de los campos del formulario
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            
            // Validación básica de los campos
            if (!username || !password || !role) {
                // Mostrar mensaje de error si algún campo está vacío
                document.getElementById('errorMessage').textContent = 'Por favor, complete todos los campos.';
                document.getElementById('errorMessage').style.display = 'block';
                return; // Detiene la ejecución del código si hay errores en los campos
            }
            
            // Enviar los datos al servidor
            try {
                const response = await fetch('http://localhost:80/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicamos que estamos enviando JSON
                    },
                    // convierte los datos a un formato json
                    body: JSON.stringify({
                        username: username, // El nombre de usuario o correo
                        password: password, // La contraseña
                        role: role // El rol del usuario
                    })
                });
                
                const data = await response.json(); // Parsear la respuesta JSON del servidor
                
                if (response.ok) {
                    // Si la respuesta es exitosa, mostramos un mensaje de éxito
                    alert('Login exitoso');
                    localStorage.setItem("Usuario", JSON.stringify(data.user)); // Guardar todo el objeto user en formato JSON
                    window.location.href = 'index.html';
                } else {
                    // Si hay un error en las credenciales, mostramos el mensaje de error recibido
                    document.getElementById('errorMessage').textContent = data.error;
                    document.getElementById('errorMessage').style.display = 'block';
                }
            } catch (error) {
                // Manejo de errores en la solicitud fetch (por ejemplo, problemas de conexión)
                console.error('Error de conexión:', error);
                document.getElementById('errorMessage').textContent = 'Hubo un problema al intentar iniciar sesión. Inténtalo de nuevo.';
                document.getElementById('errorMessage').style.display = 'block';
            }
        });