// Inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    // Obtener los valores de nombre de usuario y contraseña
    const nombreUsuario = document.getElementById('nombreUsuarioLogin').value;
    const contraseña = document.getElementById('contraseñaLogin').value;

    // Verificar si algún campo está vacío
    if (!nombreUsuario || !contraseña) {
        alert('Nombre de usuario y contraseña son requeridos');
        return; // Detener el envío de datos al servidor
    }

    // Crear un objeto con los datos de inicio de sesión
    const loginData = {
        nombreUsuario: nombreUsuario,
        contraseña: contraseña
    };

    // Enviar los datos al backend para autenticación
    fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            alert('Inicio de sesión exitoso');
            window.location.href = '/dashboard.html'; // Redireccionar al dashboard después del inicio de sesión
        } else {
            throw new Error('Credenciales inválidas');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Inicio de sesión fallido. Verifica tus credenciales e intenta nuevamente.');
    });
});
