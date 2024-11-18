document.addEventListener("DOMContentLoaded", function () {
    const usuario = localStorage.getItem("Usuario");
    let data;
    if (usuario) {
        data = JSON.parse(usuario)
        console.log("El usuario es válido.");
    } else {
        document.location.href = "./login.html";
    }

    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("Usuario");
        console.log("Usuario eliminado del localStorage.");
    });
    if (data.rol === "Administrador") {
        document.getElementById('nomostrar').style.display = 'block';
    }
    const perfilElement = document.getElementById("perfil");
    if (perfilElement) {
        perfilElement.textContent = `¡Bienvenido ${data.nombre_usuario}!`;
    }
});