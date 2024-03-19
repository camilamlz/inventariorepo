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
    fetch('bdfqojyf0cukhwtj2lrp-mysql.services.clever-cloud.com:3306/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
   // Manejar el inicio de sesión
   .then(response => {
        if (response.ok) {
            // Obtener el ID de usuario del backend
            return response.json();
        } else {
            throw new Error('Credenciales inválidas');
        }
    })
    .then(data => {
        // Inicio de sesión exitoso, almacenar el ID de usuario en la sesión del navegador
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('userName', data.userName);
      
        alert('Inicio de sesión exitoso');
        window.location.href = '/prestamos.html'; // Redirigir al usuario a la página de préstamos
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Inicio de sesión fallido. Verifica tus credenciales e intenta nuevamente.');
    });
});

// Redireccionar a la página de registro de usuario cuando se hace clic en "Cancelar"
document.getElementById('cancelar').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto
    window.location.href = 'registro_usuario.html';
});
